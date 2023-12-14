import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import DashboardCard from "@/app/(DashboardLayout)//components/shared/DashboardCard";
import { ApiResponse } from "../../interfaces/IApiResponse";

const Data = ({ data }: { data: ApiResponse[] }) => {
  return (
    <DashboardCard title="Kala-Kriti's Data">
      <Box
        sx={{
          overflow: "scroll",
          width: { xs: "280px", sm: "auto" },
          height: "440px",
        }}
      >
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: "nowrap",
            mt: 2,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Id
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  MQ2 Value
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Coordinates
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Quality
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((data: any) => (
              <TableRow key={data._id}>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "11px",
                      fontWeight: "500",
                    }}
                  >
                    {data._id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {data.mq2}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        sx={{
                          fontSize: "12px",
                        }}
                      ></Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography
                    color="textSecondary"
                    variant="subtitle2"
                    fontWeight={400}
                  >
                    <div>
                      ({data.coordinates.latitude}, {data.coordinates.longitude}
                      )
                    </div>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    sx={{
                      px: "4px",
                      backgroundColor: "#000",
                      color: "#fff",
                    }}
                    size="small"
                    label={data.quality}
                  ></Chip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </DashboardCard>
  );
};

export default Data;