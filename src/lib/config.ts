export const serverApi: string = (
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3003")
).replace(/\/$/, "");

export const Messages = {
  error1: "Something went wrong!",
  error2: "Please login first!",
  error3: "Please complete all required fields.",
  error4: "Message is empty!",
  error5: "Only images with jpeg, jpg, png, format allowed!",
};
