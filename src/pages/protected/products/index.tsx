import { getProducts } from "@/api/products";
import Standard from "@/components/layout/containers/Standard";
import { Card, CardContent } from "@/components/ui/card";
import useApi from "@/hooks/useApi";
import { ProductType } from "@/types/product";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { SelectOptionType } from "@/lib/general";
import IconButton from "@/components/ui/iconButton";
import { FilterIcon, Search, Trash2, X } from "lucide-react";
import { DialogPropType } from "@/types/general";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import MySelect from "@/components/form/select";

import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

const limit = 10;
const Products = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [categories, setCategories] = useState<SelectOptionType[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [filters, setFilters] = useState<{
    categories: string[];
    priceRange: number[];
  }>({
    categories: [],
    priceRange: [0, 99999],
  });

  const { execFun, loading } = useApi();

  const handleFetchProducts = async () => {
    setCategories([]);
    setProducts([]);
    const response: ProductType[] = await execFun(() => getProducts(), "fetch");
    setProducts(response);
    handleUpdatePageCount(response.length);
    const categorySet: Set<string> = new Set();
    response.map((row: ProductType) => categorySet.add(row.category));
    categorySet.forEach((row) => {
      setCategories((curr) => [...curr, { text: row, value: row }]);
    });
  };
  console.log("page count", pageCount);
  const applyFilter = (arr: ProductType[]) => {
    const updatedProducts = arr
      ?.filter((product) =>
        filters.categories?.length === 0
          ? true
          : filters.categories.includes(product?.category)
      )
      .filter((product) =>
        filters.priceRange.length === 2
          ? product.price > filters.priceRange[0] &&
            product.price < filters.priceRange[1]
          : product
      )
      .filter((product) =>
        searchString.length === 0
          ? product
          : product.title.toLowerCase().includes(searchString.toLowerCase())
      );

    // handleUpdatePageCount(updatedProducts.length);
    const afterPagination = updatedProducts.filter(
      (_, index) =>
        index >= limit * (currentPage - 1) && index < limit * currentPage
    );
    return { afterPagination, beforePagination: updatedProducts };
  };

  const handleUpdatePageCount = (count: number) => {
    const pCount = Math.ceil(count / limit);

    setPageCount(pCount);
  };
  useEffect(() => {
    handleFetchProducts();
  }, []);

  useEffect(() => {
    if (products.length) {
      handleUpdatePageCount(applyFilter(products).beforePagination.length);
    }
    // console.log(
    //   "length updated",
    //   applyFilter(products).beforePagination.length
    // );
  }, [filters]);

  return (
    <Standard
      title={`Our Products (${
        applyFilter(products).beforePagination.length
      }) Found`}
      extra={
        <div className="flex items-center gap-2">
          <Input
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            className="w-[400px]"
            placeholder="Search Product..."
            prefix={<Search size={18} />}
          />
          <IconButton
            hoverBackground="hover:bg-primary"
            hoverColor="hover:text-white"
            onClick={() => setShowFilters(true)}
            icon={<FilterIcon />}
          />
        </div>
      }
    >
      <Filters
        filters={filters}
        setFilters={setFilters}
        categories={categories}
        show={showFilters}
        hide={() => setShowFilters(false)}
        products={products}
      />
      {loading("fetch") && (
        <div className="flex flex-1 items-center justify-center">
          <p className="font-semibold text-muted-foreground ">
            Loading your products...
          </p>
        </div>
      )}
      <div className=" flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-4 ">
          {applyFilter(products).afterPagination.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem
              className={
                currentPage === 1 ? "opacity-50 pointer-events-none" : ""
              }
              onClick={() =>
                setCurrentPage((curr) => (curr > 1 ? curr - 1 : curr))
              }
            >
              <PaginationPrevious />
            </PaginationItem>
            {Array.apply(null, { length: pageCount ?? 1 }).map(
              (_, index) =>
                index < 2 && (
                  <PaginationItem>
                    <PaginationLink
                      className="cursor-pointer"
                      isActive={currentPage === index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                )
            )}
            {pageCount > 3 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {pageCount > 3 && (
              <PaginationItem>
                <PaginationLink
                  className="cursor-pointer"
                  isActive={currentPage === pageCount}
                  onClick={() => setCurrentPage(pageCount)}
                >
                  {pageCount}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem
              className={
                currentPage === pageCount && "opacity-50 pointer-events-none"
              }
              onClick={() =>
                setCurrentPage((curr) => (curr < pageCount ? curr + 1 : curr))
              }
            >
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </Standard>
  );
};

export default Products;

interface ProductCardPropType {
  product: ProductType;
}
const ProductCard = (props: ProductCardPropType) => {
  return (
    <div>
      <Card>
        <CardContent className="p-0 hover:bg-muted">
          <div className="flex justify-center pt-4">
            <img className="h-[130px] bg-black" src={props.product.image} />
          </div>
          <div className="flex flex-col gap-2 pt-4 mt-4  rounded-b-lg ">
            <div className="flex justify-between px-4">
              <h2 className="text-[16px] font-[500] max-w-[500px] lg:max-w-[300px]  xl:max-w-[250px] overflow-ellipsis overflow-hidden whitespace-nowrap">
                {props.product.title}
              </h2>
            </div>
            <div className="flex justify-between px-4">
              <p>Rating: {props.product.rating.rate}/5</p>
              <p>{props.product.rating.count} Reviews</p>
            </div>
            <div className="flex justify-between mt-2 rounded-b-lg bg-primary text-white p-2 px-4">
              <h2 className="text-xl font-[500]">{props.product.price}/-</h2>
              <p className="text-lg capitalize">{props.product.category}</p>
              {/* <p>Rating: {props.product.rating.rate}/5</p> */}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// RES + Mounting + (package size) + tolerance + power rating

interface FilterPropTYpe extends DialogPropType {
  categories: SelectOptionType[];
  filters: any;
  setFilters: Dispatch<
    SetStateAction<{
      categories: never[];
      priceRange: string;
    }>
  >;
  products: ProductType[];
}
const Filters = (props: FilterPropTYpe) => {
  console.log("these are the categories", props.filters);
  const removeCategory = (cat) => {
    props.setFilters((row) => ({
      ...row,
      categories: row.categories.filter((category) => category !== cat),
    }));
  };
  return (
    <Dialog open={props.show} onOpenChange={props.hide}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filters</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm">Categories</label>
            <MySelect
              placeholder="Select Categories"
              onChange={(value) =>
                props.setFilters((curr) => ({
                  ...curr,
                  categories: [...curr.categories, value],
                }))
              }
              options={props.categories.filter(
                (row) => !props.filters.categories.includes(row?.value) && row
              )}
            />
          </div>
          <div className="flex flex-wrap gap-1">
            {props.filters.categories.map((row: string) => (
              <div className="border border-primary  p-2 px-4 rounded-full text-sm flex gap-2                items-center">
                {row}
                <X
                  onClick={() => removeCategory(row)}
                  size={12}
                  className="text-primary hover:accent cursor-pointer"
                />
              </div>
            ))}
          </div>
          <div className="h-[2px] bg-border" />
          <div className="flex flex-col gap-4 relative mb-8">
            <label className="text-sm">Price Range</label>
            <Slider
              onValueChange={(value) =>
                props.setFilters((curr) => ({
                  ...curr,
                  priceRange: value,
                }))
              }
              defaultValue={[
                0,
                Math.max(...props.products.map((row) => row.price)),
              ]}
              value={props.filters.priceRange}
              max={Math.max(...props.products.map((row) => row.price))}
              step={1}
            />
            <div className="absolute left-0 bottom-[-30px] font-[500]">
              $ {props.filters.priceRange[0]}
            </div>
            <div className="absolute right-0 bottom-[-30px] font-[500]">
              $ {props.filters.priceRange[1]}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
