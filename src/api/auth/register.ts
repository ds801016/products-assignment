import { myAxios } from "@/lib/axiosInterceptor";
import { ResponseType } from "@/types/general";
import { MemberType } from "@/types/member";

interface RegisterStage1Type {
  username: string;
  password: string;
  business_name: string;
  website: string;
  email: string;
  name: string;
  last_name: string;
  office_address: string;
  zip_code: string;
  country: string;
  phone: string;
  pan_no: string;
  year_of_establishment: string;
  no_of_emp: number;
  brand_name: string;
  exportin_currently: string;
  sales_volume: string;
  industry_type: string;
  flagship_products: string;
  specific_zone_of_interest: string[];
  category_of_interest: string[];
  category: string;
  sub_category: string;
}
export const registerStage1 = async (values: MemberType["stage1"]) => {
  const payload: RegisterStage1Type = {
    brand_name: values.brandName,
    business_name: values.businessName,
    category: values.category,
    category_of_interest: values.interestCategories,
    country:
      typeof values.country === "object"
        ? values.country.value
        : values.country,
    email: values.email,
    exportin_currently: values.isExporting ? "Yes" : "No",
    flagship_products: values.flagShipProducts,
    industry_type: values.industryType,
    last_name: values.lastName,
    name: values.firstName,
    no_of_emp: +values.empCount,
    office_address: values.officeAddress,
    pan_no: values.pan,
    password: values.password,
    phone: values.phone,
    sales_volume: values.salesVolume,
    specific_zone_of_interest: values.interestZones,
    sub_category: values.subCategory,
    username: values.userName,
    website: values.website,
    year_of_establishment: values.establishmentYear,
    zip_code: values.zipCode,
  };
  console.log("this is the final payload", payload);

  const response: ResponseType = await myAxios.post(
    "/registration/registration_stage1",
    payload
  );

  return response;
};

interface RegisterStage2Type {
  reg1_key: string;
  full_name: string;
  designation: string;
  mobile_no: string;
  street_address: string;
  city: string;
  zip_code: string;
  country: string;
  dob: string;
  gender: string;
  marital_status: string;
  nationality: string;
  name_of_alt: string;
}
export const registserStage2 = async (
  values: MemberType["stage2"],
  stage1Key: string
) => {
  const payload: RegisterStage2Type = {
    reg1_key: stage1Key,
    city: values.city,
    country:
      typeof values.country === "object"
        ? values.country.value
        : values.country,
    designation: values.designation,
    dob: values.dob,
    full_name: values.name,
    gender: values.gender,
    marital_status: values.maritalStatus,
    mobile_no: values.phone,
    name_of_alt: values.alternativeName,
    nationality: values.nationality,
    street_address: values.address,
    zip_code: values.zipCode,
  };

  const response: ResponseType = await myAxios.post(
    "/registration/registration_stage2",
    payload
  );
  return response;
};
