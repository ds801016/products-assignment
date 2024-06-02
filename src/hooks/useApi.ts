import { ResponseType } from "@/types/general";
import useLoading from "./useLoading";
import useToaster from "./useToaster";

const useApi = () => {
  const { loading, setLoading } = useLoading();
  const showToast = useToaster();

  const execFun = async (
    fun: () => Promise<ResponseType>,
    loadingLabel: string
  ) => {
    let savedResponse;
    try {
      setLoading(loadingLabel, true);
      const response: ResponseType = await fun();
      console.log("response in use api", response);
      savedResponse = response;
      // if (!response) {
      //   throw new Error(
      //     "Something wrong happened, Please Contact administrator"
      //   );
      // }

      // if (!response.success) {
      //   console.log("it was here", response);
      //   throw new Error(
      //     response.message ??
      //       "Something wrong happened, Please Contact administrator"
      //   );
      // }

      // if (response.success && response.message) {
      //   showToast("success", "Success!!", response.message);
      // } else if (!response.success && response.message) {
      //   throw new Error(response.message);
      // }

      return response;
    } catch (error) {
      let message = "";
      if (typeof error === "string") {
        message = error;
      } else if (error instanceof Error) {
        message = error.message;
      }

      showToast("error", "Error!!", message);
      return {
        data: savedResponse?.data,
        error: true,
        success: false,
        message: message,
      };
    } finally {
      setLoading(loadingLabel, false);
    }
  };
  return { execFun, loading };
};

export default useApi;
