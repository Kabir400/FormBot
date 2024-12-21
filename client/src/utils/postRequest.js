const postRequest = async (url, data, type) => {
  let Data = data;
  let headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  if (type === "json") {
    Data = JSON.stringify(data);
    headers = {
      "Content-Type": "application/json",
    };
  }

  const token = localStorage.getItem("authToken");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: Data,
  });
  const result = await response.json();
  return result;
};

export default postRequest;
