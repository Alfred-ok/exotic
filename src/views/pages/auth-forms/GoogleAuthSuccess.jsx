import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function GoogleAuthSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const success = params.get("success");
    const token = params.get("token");
    const id = params.get("id");
    const name = params.get("name");
    const email = params.get("email");
    const role = params.get("role");

    if (success === "true" && token) {
      const user = { id, name, email, role };

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (role === "sales") {
        navigate("/platform-selector");
      } else {
        navigate("/dashboard");
      }
    } else {
      Swal.fire("Google login failed", "Try again.", "error");
      navigate("/login");
    }
  }, []);

  return <h2>Authenticating with Google, please wait…</h2>;
}
