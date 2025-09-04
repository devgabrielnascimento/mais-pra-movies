import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { purple } from "@mui/material/colors";

interface ButtonType {
  text: string;
  bgColor: string;
  path?: string;
  eventClick?: () => void;
}

export default function FilledButton({
 text,
  bgColor,
  eventClick,
}: ButtonType) {
  const MyButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(bgColor),
    backgroundColor: bgColor,
    boxShadow: "none",
    textTransform: "none",
    fontSize: 12,
    fontWeight: "bold",
    padding: "6px 20px",
    lineHeight: 1.5,
    borderColor: "#0063cc",
    borderRadius: "30px",
    "&:hover": {
      backgroundColor: purple[700],
      color: theme.palette.getContrastText(purple[700]),
    },
  }));

  return (
    <MyButton variant="contained" onClick={eventClick}>
    
      {text}
    </MyButton>
  );
}
