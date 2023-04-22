exports.handler = async (event) => {
  console.log(event);

  return {
    body: "demo",
    statusCode: 200
  };
};
