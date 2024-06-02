import MyFormField from "@/components/form/Input";
import MyForm from "@/components/form/MyForm";

import { Button } from "@/components/ui/button";

import useForm from "@/hooks/useForm";
import * as z from "zod";
import { ArrowLeft, ArrowRight, Check, RefreshCcw } from "lucide-react";
import { SelectOptionType } from "@/lib/general";
import FormSelect from "@/components/form/select/FormSelect";
import { stage2Schema } from "@/pages/auth/register/schema";
import { MemberType } from "@/types/member";
import { useSearchParams } from "react-router-dom";
import useApi from "@/hooks/useApi";
import { registserStage2 } from "@/api/auth/register";
import FormAsyncSelect from "@/components/form/select/asyncSelect";
import { fetchCountryOptions } from "@/api/master";
import { useState } from "react";

const Stage2 = () => {
  const [stage, setStage] = useState<1 | 2>(1);
  const form = useForm<MemberType["stage2"]>({}, stage2Schema);
  const [searchParams] = useSearchParams();
  const { execFun, loading } = useApi();

  const validateHandler = async () => {
    const stage1Key = searchParams.get("stage1Key");
    const values = await form.validate();

    if (values && stage1Key) {
      const response = await execFun(
        () => registserStage2(values, stage1Key),
        "submit"
      );
    }
  };

  const handleNext = () => {
    if (stage === 1) {
      setStage(2);
    }
  };
  const handlePrev = () => {
    if (stage === 2) {
      setStage(1);
    }
  };
  return (
    <div className="w-full h-full  px-6 lg:px-10 xl:px-20">
      <MyForm form={form}>
        <div className="w-full">
          {stage === 1 && (
            <div>
              <h2 className="text-2xl mb-2">Basic Details</h2>
              <div className=" grid grid-cols-1 lg:grid-cols-2 gap-2 w-full pb-6">
                <div>
                  <MyFormField
                    control={form.control}
                    name="name"
                    label="Full Name"
                  />
                </div>
                <div>
                  <FormSelect
                    placeholder="Select gender"
                    options={genderOptions}
                    control={form.control}
                    name="gender"
                    label="Gender"
                  />
                </div>
                <div>
                  <MyFormField
                    control={form.control}
                    name="phone"
                    label="Mobile"
                  />
                </div>
                <div>
                  <MyFormField
                    control={form.control}
                    name="designation"
                    label="Designation"
                  />
                </div>

                <div>
                  <MyFormField
                    control={form.control}
                    name="dob"
                    label="Date Of Birth"
                  />
                </div>
                <div>
                  <FormSelect
                    placeholder="Select Marital Status"
                    options={maritalStatusOptions}
                    control={form.control}
                    name="maritalStatus"
                    label="Marital Status"
                  />
                </div>
                <div>
                  <MyFormField
                    control={form.control}
                    name="nationality"
                    label="Nationality"
                  />
                </div>
                <div>
                  <MyFormField
                    control={form.control}
                    name={"alternativeName"}
                    label="Father/Mother/Spouse Name"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        {stage === 2 && (
          <div className="w-full flex flex-col items-center">
            <div className="">
              <h2 className="text-2xl mb-4 w-[500px]">Address Details</h2>
            </div>
            <div className="flex flex-col  w-[500px] pb-6">
              <div>
                <FormAsyncSelect
                  searchFunction={fetchCountryOptions}
                  control={form.control}
                  name="country"
                  label="Select Country"
                  placeholder="Search Country"
                />
              </div>

              <div>
                <MyFormField control={form.control} name="city" label="City" />
              </div>

              <div>
                <MyFormField
                  control={form.control}
                  name="zipCode"
                  label="Pin Code"
                />
              </div>
              <div className="col-span-3">
                <MyFormField
                  control={form.control}
                  name="address"
                  label="Address"
                  textArea
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-center gap-2">
          {/* <Button variant="outline" icon={<RefreshCcw size={16} />}>
            Reset
          </Button> */}
          {stage === 2 && (
            <Button
              variant="outline"
              onClick={handlePrev}
              icon={<ArrowLeft size={16} />}
            >
              Back
            </Button>
          )}
          <Button
            loading={loading("submit")}
            icon={stage === 1 ? <ArrowRight size={16} /> : <Check size={16} />}
            onClick={stage === 1 ? handleNext : validateHandler}
          >
            {stage === 1 && "Next"}
            {stage === 2 && "Save and Continue"}
          </Button>
        </div>
      </MyForm>
    </div>
  );
};

export default Stage2;

const maritalStatusOptions = [
  {
    text: "Married",
    value: "Married",
  },
  {
    text: "Unmarried",
    value: "Unmarried",
  },
  {
    text: "Divorced",
    value: "Divorced",
  },
  {
    text: "Widow",
    value: "Widow",
  },
];
const genderOptions = [
  {
    text: "Male",
    value: "Male",
  },
  {
    text: "Female",
    value: "Female",
  },
  {
    text: "Other",
    value: "Other",
  },
];
