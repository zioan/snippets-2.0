// // backend server
export default process.env.NODE_ENV === "development"
  ? "http://localhost:4000"
  : process.env.NODE_ENV === "production" && "https://api.snippets.zioan.com";
