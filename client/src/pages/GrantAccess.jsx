//base url-
const base_url = import.meta.env.VITE_BASE_URL;

import React, { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import getRequest from "../utils/getRequest";
import { toast } from "react-toastify";

function GrantAccess() {
  const { token } = useParams();
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setIsPending(true);
      const result = await getRequest(`${base_url}/assign/link/${token}`);

      if (result.suceess === true) {
        setIsPending(false);
        navigate("/dashboard");
        toast.success(result.message, {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        if (result.status === 401) {
          navigate("/login");
          toast.error("You have to Login first", {
            position: "top-right",
            autoClose: 3000,
          });
          setIsPending(false);
          return;
        }
        setIsPending(false);
        toast.error(result.message, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    })();
  }, []);

  if (isPending) {
    return <Loader />;
  }

  return <div></div>;
}

export default GrantAccess;
