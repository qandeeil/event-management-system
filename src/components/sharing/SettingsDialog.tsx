import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "@/styles/sharing/settingsDialog.scss";
import Image from "next/image";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CustomInput from "../registration/sharing/CustomInput";
import { IEditAccount } from "../registration/signup/Interfaces";
import CustomInputPhoneNumber from "../registration/sharing/CustomInputPhoneNumber";
import { useAppDispatch } from "@/store/hooks";
import { updateAccountThunk } from "@/store/user/user";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Props = {
  openSettingsDialog: boolean;
  setOpenSettingsDialog: (v: boolean) => void;
  user: any;
  getInitials: any;
  token: string | undefined;
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const SettingsDialog = ({
  openSettingsDialog,
  setOpenSettingsDialog,
  user,
  getInitials,
  token,
}: Props) => {
  const dispatch = useAppDispatch();
  const { data: sesstion, update } = useSession();
  const router = useRouter();
  const handleClose = () => {
    setOpenSettingsDialog(false);
  };
  const [selectImage, setSelectImage] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<any>(null);
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setSelectImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };
  const [newDataUser, setNewDataUser] = useState<any>();
  const [userData, setUserData] = useState<IEditAccount>({
    name: user?.name,
    email: user?.email,
    phone_number: user?.phone_number,
    profile_image: selectImage,
  });
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    setUserData({
      name: user?.name,
      email: user?.email,
      phone_number: user?.phone_number,
      profile_image: user?.profile_image,
    });
  }, [user]);

  useEffect(() => {
    setUserData((prevState) => ({
      ...prevState,
      profile_image: selectImage,
    }));
  }, [selectImage]);

  const updateDataHandler = async () => {
    setIsLoading(true);
    const formData: any = new FormData();
    formData.append("token", token);
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("phone_number", userData.phone_number);
    if (selectImage) {
      formData.append("profile_image", selectImage);
    }

    const response = await dispatch(
      updateAccountThunk({ token: token, data: formData })
    );
    console.log(response);
    if (response.payload?.updated) {
      setNewDataUser(response.payload.user);
    }
    if (response) setIsLoading(false);
  };

  const updateSession = async () => {
    await update({
      ...getSession(),
      user: newDataUser,
    }).then(() => window.location.reload());
  };

  useEffect(() => {
    if (newDataUser) {
      updateSession();
    }
  }, [newDataUser]);

  return (
    <Dialog
      open={openSettingsDialog}
      onClose={handleClose}
      className="settingsDialog individual-screen"
      maxWidth="lg"
    >
      <DialogTitle sx={{ fontWeight: "bold" }}>Account settings</DialogTitle>
      <DialogContent
        className="dialogContent"
        sx={{ display: "flex", flex: 1 }}
      >
        <Box
          noValidate
          component="form"
          sx={{
            display: "flex",
            flexDirection: "row",
            m: "auto",
            width: "fit-content",
            gap: 3,
          }}
        >
          <div className="profileImage">
            <label htmlFor="uploadImage" className="containerImage">
              {user?.profile_image || imageUrl ? (
                <Image
                  src={imageUrl || user?.profile_image}
                  alt={user?.name}
                  width={900}
                  height={400}
                  className="profile_image"
                />
              ) : (
                getInitials(user?.name)
              )}
            </label>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              style={{ width: "100%", height: "3rem" }}
            >
              Upload photo
              <VisuallyHiddenInput
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                id="uploadImage"
              />
            </Button>
          </div>
          <form className="form">
            <CustomInput
              lable={"Full name"}
              placeholder={"Full name"}
              type={"text"}
              onChange={handleInputChange}
              value={userData.name}
              name="name"
              isError={user?.isError?.name === false}
              message={user?.isError?.message}
            />
            <CustomInput
              lable={"Email Address"}
              placeholder={"Email Address"}
              type={"email"}
              onChange={handleInputChange}
              value={userData.email}
              name="email"
              isError={user?.isError?.email === false}
              message={user?.isError?.message}
            />
            <CustomInputPhoneNumber
              lable="Phone Number"
              onChange={(e: string | undefined) =>
                setUserData((prevData) => ({
                  ...prevData,
                  phone_number: e,
                }))
              }
              value={userData.phone_number}
              isError={user?.isError?.phone_number === false}
              message={user?.isError?.message}
            />
            <CustomInput
              lable={"Account Type"}
              placeholder={"Account Type"}
              type={"text"}
              onChange={handleInputChange}
              value={user?.account_type}
              name="account_type"
              isError={user?.isError?.account_type === false}
              message={user?.isError?.message}
            />
          </form>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error" sx={{ fontWeight: "bold" }}>
          Close
        </Button>
        <Button
          onClick={updateDataHandler}
          sx={{ fontWeight: "bold" }}
          disabled={isLoading}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettingsDialog;
