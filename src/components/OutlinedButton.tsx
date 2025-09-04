import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { purple } from "@mui/material/colors";
import { Link } from "react-router-dom";

const MyButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#6700D4"),
  backgroundColor: "transparent",
  boxShadow: "none",
  textTransform: "none",
  fontSize: 12,
  fontWeight: "bold",
  padding: "6px 35px",
  lineHeight: 1.5,
  border: "1px solid #AF63FF",
  borderRadius: "20px",
  width: "100%",
  "&:hover": {
    backgroundColor: purple[700],
  },
}));

interface ButtonType {
  text: string;
  path: string;
}

export default function OutlinedButton({ text, path }: ButtonType) {
  return (
    <Link to={`${path}`}>
      <MyButton className="max-w-64">{text}</MyButton>
    </Link>
  );
}
