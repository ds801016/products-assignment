import MyFormField from "@/components/form/Input";
import MyForm from "@/components/form/MyForm";

import { Button } from "@/components/ui/button";

import useForm from "@/hooks/useForm";
import * as z from "zod";
import { ArrowLeft, ArrowRight, Check, Eye, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { SelectOptionType } from "@/lib/general";
import useApi from "@/hooks/useApi";
import {
  fetchCategoryOptions,
  fetchCountryOptions,
  getInterstedCategories,
  getInterstedZones,
} from "@/api/master";
import { CategoryTypeExtended } from "@/types/general";
import FormSelect from "@/components/form/select/FormSelect";
import { useWatch } from "react-hook-form";
import { convertSelectOptions } from "@/lib/utils";
import CheckBox from "@/components/form/checkbox";
import FormAsyncSelect from "@/components/form/select/asyncSelect";
import { stage1Schema } from "@/pages/auth/register/schema";
import { MemberType } from "@/types/member";
import { registerStage1 } from "@/api/auth/register";
import { useNavigate } from "react-router-dom";
import { routeConstants } from "@/lib/routeConstants";
import { EyeClosedIcon } from "@radix-ui/react-icons";

const Stage1 = () => {
  const [stage, setStage] = useState<1 | 2 | 3 | 4>(1);
  const [categoryOptions, setCategoryOptions] = useState<SelectOptionType[]>(
    []
  );
  const [subCategoryOptions, setSubCategoryOptions] = useState<
    SelectOptionType[]
  >([]);
  const [rawCategories, setRawCategories] = useState<CategoryTypeExtended[]>(
    []
  );
  const [interestedZones, setInterestedZones] = useState<SelectOptionType[]>(
    []
  );
  const [interestedCategories, setInterestedCategories] = useState<
    SelectOptionType[]
  >([]);

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirm: false,
  });

  const form = useForm<MemberType["stage1"]>({}, stage1Schema);
  const navigate = useNavigate();
  const { execFun, loading } = useApi();

  const selectedCategory = useWatch({
    control: form.control,
    name: "category",
  });

  const handleFetchCategoryOptions = async () => {
    const response = await execFun(() => fetchCategoryOptions(), "fetch");
    setRawCategories(response.data);
    setCategoryOptions(
      response.data.map(
        (row: CategoryTypeExtended): SelectOptionType => ({
          text: row.name,
          value: row.code,
        })
      )
    );
  };

  const handleFetchInteresetedZoneOptions = async () => {
    const response = await execFun(() => getInterstedZones(), "fetch");

    setInterestedZones(response.data ?? []);
  };
  const handleFetchInteresetedCategoryOptions = async () => {
    const response = await execFun(() => getInterstedCategories(), "fetch");

    setInterestedCategories(response.data ?? []);
  };

  const validateHandler = async () => {
    const values = await form.validate();
    if (values) {
      const response = await execFun(() => registerStage1(values), "submit");
      if (response.success) {
        form.reset();
      }
    }
  };

  const togglePassword = (type: "password" | "confirm") => {
    setShowPassword((curr) => ({
      ...curr,
      [type]: !curr[type],
    }));
  };

  const incrementStage = () => {
    if (stage < 4) {
      setStage((curr) => curr + 1);
    }
  };
  const deccrementStage = () => {
    if (stage > 0) {
      setStage((curr) => curr - 1);
    }
  };

  useEffect(() => {
    handleFetchCategoryOptions();

    handleFetchInteresetedZoneOptions();
    handleFetchInteresetedCategoryOptions();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const found: CategoryTypeExtended | undefined = rawCategories.find(
        (row) => row.code === selectedCategory
      );

      if (found) {
        setSubCategoryOptions(convertSelectOptions(found.sub, "name", "code"));
      }
    }
  }, [selectedCategory]);
  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <MyForm form={form}>
        {stage === 1 && (
          <BasicDetails
            form={form}
            showPassword={showPassword}
            togglePassword={togglePassword}
            incrementStage={incrementStage}
            decrementStage={deccrementStage}
          />
        )}
        {/* company details */}
        {stage === 2 && (
          <CompanyDetails
            form={form}
            incrementStage={incrementStage}
            decrementStage={deccrementStage}
          />
        )}
        {stage === 3 && (
          <BusinessDetails
            form={form}
            categoryOptions={categoryOptions}
            subCategoryOptions={subCategoryOptions}
            interestedZones={interestedZones}
            interestedCategories={interestedCategories}
            validateHandler={validateHandler}
            loading={loading}
            incrementStage={incrementStage}
            decrementStage={deccrementStage}
          />
        )}
        {/* </div> */}
      </MyForm>

      {/* <div className="flex justify-center h-[8%]">
        <Button variant="link" onClick={goToLogin}>
          Already have an account? Sign In
        </Button>
      </div> */}
    </div>
  );
};

export default Stage1;

interface ElementsPropTypes {
  form: any;
  showPassword?: {
    password: boolean;
    confirm: boolean;
  };
  togglePassword?: (type: "password" | "confirm") => void;
  categoryOptions?: SelectOptionType[];
  subCategoryOptions?: SelectOptionType[];
  interestedZones?: SelectOptionType[];
  interestedCategories?: SelectOptionType[];
  validateHandler?: () => Promise<void>;
  loading?: (name: any) => boolean;
  incrementStage: () => void;
  decrementStage: () => void;
}
const BasicDetails = (props: ElementsPropTypes) => {
  return (
    <div className="w-full">
      <h2 className="text-2xl mb-2 ">Basic Details</h2>
      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-2 w-full pb-6">
        <div>
          <MyFormField
            control={props.form.control}
            name="firstName"
            label="First Name"
            placeholder="Enter First Name"
            description="Owner's First Name"
          />
        </div>
        <div>
          <MyFormField
            control={props.form.control}
            name="lastName"
            placeholder="Enter Last Name"
            label="Last Name"
            description="Owner's Last Name"
          />
        </div>
        <div>
          <MyFormField
            control={props.form.control}
            name="userName"
            placeholder="Enter Username"
            label="Username"
          />
        </div>

        <div>
          <MyFormField
            control={props.form.control}
            name="businessName"
            placeholder="Enter Business"
            label="Business/Organization Name"
          />
        </div>

        <div>
          <div>
            <MyFormField
              control={props.form.control}
              name="email"
              placeholder="Enter Email"
              label="E-mail"
            />
          </div>
        </div>
        <div>
          <MyFormField
            control={props.form.control}
            name="website"
            placeholder="Enter Website"
            label="Website"
          />
        </div>
        <div>
          <MyFormField
            control={props.form.control}
            name="password"
            placeholder="Enter Password"
            type={props.showPassword?.password ? "password" : "text"}
            suffix={
              props.showPassword?.password ? (
                <EyeClosedIcon
                  onClick={() => props.togglePassword("password")}
                  size={16}
                />
              ) : (
                <Eye
                  onClick={() => props.togglePassword("password")}
                  size={16}
                />
              )
            }
            label="Password"
          />
        </div>
        <div>
          <MyFormField
            placeholder="Confirm Password"
            control={props.form.control}
            name="confirmPassword"
            type={props.showPassword.confirm ? "password" : "text"}
            suffix={
              props.showPassword.confirm ? (
                <EyeClosedIcon
                  onClick={() => props.togglePassword("confirm")}
                  size={16}
                />
              ) : (
                <Eye
                  onClick={() => props.togglePassword("confirm")}
                  size={16}
                />
              )
            }
            label="Confirm Password"
          />
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-3">
        <Button onClick={props.incrementStage} icon={<ArrowRight size={18} />}>
          Next
        </Button>
      </div>
    </div>
  );
};

const CompanyDetails = (props: ElementsPropTypes) => {
  return (
    <div className="w-full pb-6">
      <h2 className="text-2xl mb-2">Company Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <FormAsyncSelect
          searchFunction={fetchCountryOptions}
          control={props.form.control}
          name="country"
          label="Select Country"
          placeholder="Search Country"
        />

        <MyFormField
          control={props.form.control}
          name="phone"
          placeholder="Enter Phone Number"
          label="Phone"
        />

        <MyFormField
          control={props.form.control}
          placeholder="Enter PAN Number"
          name="pan"
          label="PAN"
        />

        <MyFormField
          control={props.form.control}
          name="establishmentYear"
          placeholder="Enter Year of Establishment"
          label="Year of establishment"
        />

        <MyFormField
          type="number"
          control={props.form.control}
          name="empCount"
          placeholder="Enter Employee Count"
          label="Employee Count"
        />

        <MyFormField
          control={props.form.control}
          name="zipCode"
          placeholder="Enter Zip Code"
          label="Zip Code"
        />

        <div className="md:col-span-2">
          <MyFormField
            textArea
            placeholder="Enter Office Address"
            control={props.form.control}
            name="officeAddress"
            label="Office Address"
          />
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-3">
        <Button
          variant={"outline"}
          onClick={props.decrementStage}
          icon={<ArrowLeft size={18} />}
        >
          Back
        </Button>
        <Button onClick={props.incrementStage} icon={<ArrowRight size={18} />}>
          Next
        </Button>
      </div>
    </div>
  );
};
const BusinessDetails = (props: ElementsPropTypes) => {
  return (
    <div className="w-full pb-10 px-4">
      <div className="w-full flex-1 ">
        <h2 className="text-2xl mb-2">Business Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2  gap-2">
          <div>
            <FormSelect
              options={props.categoryOptions ?? []}
              control={props.form.control}
              name="category"
              label="Category"
              placeholder="Select Category"
            />
          </div>
          <div>
            <FormSelect
              options={props.subCategoryOptions ?? []}
              control={props.form.control}
              name="subCategory"
              label="Sub Category"
              placeholder="Select Sub Category"
            />
          </div>
          <div>
            <MyFormField
              control={props.form.control}
              name="brandName"
              label="Brand"
            />
          </div>
          <div>
            <CheckBox
              name="isExporting"
              control={props.form.control}
              label="Currently Exporting?"
            />
          </div>
          <div>
            <MyFormField
              control={props.form.control}
              name="salesVolume"
              label="Sales Volume"
            />
          </div>
          <div>
            <MyFormField
              control={props.form.control}
              name="industryType"
              label="Industry"
            />
          </div>
          <div>
            <MyFormField
              control={props.form.control}
              name="flagShipProducts"
              label="Flagship Product"
            />
          </div>

          <div className="col-span-2 border-t pt-4 mt-4 justify-between flex gap-18 gap-y-6 flex-wrap">
            <CheckBox
              multiple={true}
              description="Select more than 1"
              options={props.interestedZones ?? []}
              name="interestZones"
              control={props.form.control}
              label="Interest Zones"
              gridCol={4}
            />
            <CheckBox
              multiple={true}
              options={props.interestedCategories ?? []}
              name="interestCategories"
              description="Select max 3"
              control={props.form.control}
              label="Interest Categories"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-2 my-6 mb-8">
        <Button
          onClick={props.decrementStage}
          variant="outline"
          icon={<ArrowLeft size={15} />}
        >
          Back
        </Button>
        {/* <Button variant="outline" icon={<RefreshCcw size={15} />}>
          Reset
        </Button> */}
        <Button
          loading={props.loading("submit")}
          onClick={props.validateHandler}
          icon={<Check size={16} />}
        >
          Save and Continue
        </Button>
      </div>
    </div>
  );
};
