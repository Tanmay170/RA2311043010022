import { Card, CardContent, Typography, Chip } from "@mui/material";
import { Log } from "../utils/logger";

const NotificationCard = ({ data, isNew, onClick }: any) => {
  const handleClick = () => {
    Log(
      "frontend",
      "info",
      "component",
      `Clicked notification ${data.ID}`
    );
    onClick();
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        mb: 2,
        backgroundColor: isNew ? "#e8f5e9" : "#f5f5f5",
        cursor: "pointer",
      }}
    >
      <CardContent>
        <Typography variant="h6">{data.Message}</Typography>
        <Typography>{data.Type}</Typography>
        <Typography variant="caption">{data.Timestamp}</Typography>

        {isNew && <Chip label="NEW" color="success" sx={{ ml: 1 }} />}
      </CardContent>
    </Card>
  );
};

export default NotificationCard;