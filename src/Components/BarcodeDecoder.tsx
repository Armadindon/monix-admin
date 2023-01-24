import React from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import { useEffect, useRef, useState } from "react";

import CameraFrontIcon from "@mui/icons-material/CameraFront";
import { Box } from "@mui/system";
import { IconButton } from "@mui/material";

export type BarcodeResult = {
  format: string;
  barcode: string;
};

export type BarcodeDecoderProps = {
  onResult: (result: BarcodeResult) => void;
  onUnableToHaveCamera?: () => void;
};

const codeReader = new BrowserMultiFormatReader(undefined, 200);

const BarcodeDecoder = ({
  onResult,
  onUnableToHaveCamera,
}: BarcodeDecoderProps) => {
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>();
  const [selectedVideoDevice, setSelectedVideoDevice] = useState<number>(0);
  const [videoPermission, setVideoPermission] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => setVideoPermission(stream.getVideoTracks().length > 0))
      .catch(() => {
        console.log("Unable to have camera");
        if (onUnableToHaveCamera) onUnableToHaveCamera();
      });

    codeReader.listVideoInputDevices().then((videoDevicesList) => {
      setVideoDevices(videoDevicesList);
    });
  }, []);

  useEffect(() => {
    if (!videoDevices || videoDevices.length === 0 || !videoPermission) return;
    codeReader.reset();
    codeReader.decodeFromVideoDevice(
      videoDevices[selectedVideoDevice].deviceId,
      videoRef.current as HTMLVideoElement,
      (result) => {
        if (!result) return;
        onResult({
          barcode: result.getText(),
          format: result.getBarcodeFormat().toString(),
        });
      }
    );
  }, [videoDevices, selectedVideoDevice, videoPermission]);

  return (
    <>
      {videoPermission && videoDevices && videoDevices.length && (
        <Box sx={{ position: "relative" }}>
          {videoDevices.length > 1 && (
            <IconButton
              sx={{
                position: "absolute",
                top: "10px",
                left: "10px",
                zIndex: 100,
              }}
              onClick={() => {
                setSelectedVideoDevice(
                  (selectedVideoDevice + 1) % videoDevices.length
                );
              }}
            >
              <CameraFrontIcon htmlColor="white" />
            </IconButton>
          )}
          <video
            ref={videoRef}
            style={{ borderRadius: "10px", maxWidth: "80vw" }}
          />
        </Box>
      )}
    </>
  );
};

export default BarcodeDecoder;
