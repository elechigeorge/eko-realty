export const successResponse = (res: any, data: any, message: string = "Success") => {
    res.status(200).json({ status: "success", message, data });
  };
  
  export const errorResponse = (res: any, error: any, status: number = 500) => {
    res.status(status).json({ status: "error", message: error.message || "An error occurred" });
  };
  