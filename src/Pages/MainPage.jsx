import { Box, Stack, TextField, Button, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { MuiFileInput } from "mui-file-input";
import Divider from "@mui/material/Divider";
import { parseConnectionString } from "../serviceFuctions/service";
import { PostRequest } from "../Fetch/Requests";
import { SERVER_PATH } from "../constants/PATH_CONSTANTS";

export const MainPage = () => {
  const [inputTab, setInputTab] = useState("2");
  const [inputFile, setInputFile] = useState(null);
  const [dbUrl, setDbUrl] = useState("");
  const [status, setStatus] = useState("");
  const [downloadLink, setDownloadLink] = useState("");

  const handleInputTabChange = (event, newVal) => {
    setInputFile(null);
    setInputTab(newVal);
    setDbUrl(event.target.value);
  };

  const handleFileUpload = (val) => {
    setInputFile(val);
  };

  const handleUrlInputChange = (event) => {
    setDbUrl(event.target.value);
  };

  const uploadData = async () => {
    if (dbUrl !== "") {
      const data = parseConnectionString(dbUrl);
      const response = PostRequest(SERVER_PATH, data, false);
      if (response.status === 200) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } else {
      try {
        const data = inputFile;
        const responseBlob = await PostRequest(SERVER_PATH, data, true);
        const blobUrl = URL.createObjectURL(responseBlob);
        setDownloadLink(blobUrl);
        setStatus("success");
      } catch (error) {
        setStatus("error");
      }
    }
  };

  return (
    <Box display="flex" justifyContent="center" marginTop={"100px"}>
      <Box
        id="input"
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          minHeight: 400,
        }}
      >
        <TabContext value={inputTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleInputTabChange}
              aria-label="lab API tabs example"
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Tab label="Database" value="1" minWidth={"50%"} />
              <Tab label="File" value="2" minWidth={"50%"} />
            </TabList>
          </Box>

          <TabPanel
            value="1"
            sx={{
              opacity: inputTab === "1" ? 1 : 0,
            }}
          >
            <Box
              width={350}
              sx={{
                backgroundColor: "#f0f0f0",
                borderRadius: 2,
                padding: 2,
              }}
            >
              <Stack direction="column" gap={2}>
                <TextField
                  id="db-url"
                  label="Database URL"
                  value={dbUrl}
                  onChange={handleUrlInputChange}
                />
              </Stack>
            </Box>
          </TabPanel>

          <TabPanel
            value="2"
            sx={{
              transition: "opacity 0.3s ease-in-out",
              opacity: inputTab === "2" ? 1 : 0,
            }}
          >
            <Box
              width={350}
              sx={{
                backgroundColor: "#f0f0f0",
                borderRadius: 2,
                padding: 2,
              }}
            >
              <MuiFileInput
                label="Upload file"
                value={inputFile}
                onChange={handleFileUpload}
              />
            </Box>
          </TabPanel>
        </TabContext>
        {downloadLink && (
          <Box id="file_download" sx={{ textAlign: "center", marginTop: 2 }}>
            <a href={downloadLink} download="yourFileName.ext">
              Download File
            </a>
          </Box>
        )}
        <Box
          sx={{
            mt: "auto",
            paddingTop: 2,
          }}
        >
          <Button
            variant="outlined"
            fullWidth
            onClick={uploadData}
            disabled={inputFile === null && dbUrl === ""}
          >
            Upload Data
          </Button>
        </Box>

        {status && (
          <Typography
            sx={{
              color: status === "success" ? "green" : "red",
              textAlign: "center",
              marginTop: 2,
            }}
          >
            {status === "success" ? "Upload successful!" : "Upload failed!"}
          </Typography>
        )}
      </Box>
    </Box>
  );
};
