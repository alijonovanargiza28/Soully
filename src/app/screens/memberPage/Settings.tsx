import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Messages } from "../../../lib/config";
import { mediaUrl } from "../../../lib/media";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import { MemberUpdateInput } from "../../../lib/types/member";
import { useGlobal } from "../../hooks/useGlobals";
import MemberService from "../../services/MemberService";

export function Settings() {
  const { authMember, setAuthMember } = useGlobal();
  const [saving, setSaving] = useState(false);
  const busy = useRef(false);

  const [memberImage, setMemberImage] = useState<string>(
    authMember?.memberImage ? mediaUrl(authMember.memberImage) : "/icons/default-user.svg",
  );

  const [memberUpdateInput, setMemberUpdateInput] = useState<MemberUpdateInput>({
    memberNick: authMember?.memberNick,
    memberPhone: authMember?.memberPhone,
    memberAdress: authMember?.memberAdress,
    memberDesc: authMember?.memberDesc,
  });

  useEffect(
    () => () => {
      if (memberImage.startsWith("blob:")) URL.revokeObjectURL(memberImage);
    },
    [memberImage],
  );

  const memberNickHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMemberUpdateInput((previous) => ({ ...previous, memberNick: value }));
  };

  const memberPhoneHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMemberUpdateInput((previous) => ({ ...previous, memberPhone: value }));
  };

  const memberAdressHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMemberUpdateInput((previous) => ({ ...previous, memberAdress: value }));
  };

  const memberDescriptionHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMemberUpdateInput((previous) => ({ ...previous, memberDesc: value }));
  };

  const handleSubmitButton = async () => {
    if (busy.current) return;
    busy.current = true;
    setSaving(true);
    try {
      if (!authMember) throw new Error(Messages.error2);

      if (memberUpdateInput.memberNick === "" || memberUpdateInput.memberPhone === "") {
        throw new Error(Messages.error3);
      }

      const member = new MemberService();

      const result = await member.updateMember(memberUpdateInput);

      setAuthMember(result);

      await sweetTopSmallSuccessAlert("Modified successfully!", 700);
    } catch (err) {
      sweetErrorHandling(err).then();
    } finally {
      busy.current = false;
      setSaving(false);
    }
  };

  const handleImageViewer = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const fileType = file.type;

    const validateImageTypes = ["image/jpg", "image/jpeg", "image/png"];

    if (!validateImageTypes.includes(fileType)) {
      sweetErrorHandling(Messages.error5).then();
    } else {
      setMemberUpdateInput((previous) => ({ ...previous, memberImage: file }));
      setMemberImage(URL.createObjectURL(file));
    }
  };

  return (
    <Box className="settings">
      {/* HEADER */}
      <div className="settings-header">
        <div>
          <span className="settings-overline">SOULLY ACCOUNT</span>

          <h1>Personal Information</h1>
        </div>
      </div>

      {/* PROFILE IMAGE */}
      <Box className="member-media-frame">
        <div className="profile-image-wrapper">
          <img src={memberImage} alt="Member" className="mb-image" />

          <div className="image-edit-icon">
            <CloudDownloadIcon />
          </div>
        </div>

        <div className="media-change-box">
          <h3>Profile photo</h3>

          <p>Choose a beautiful photo for your Soully profile.</p>

          <Button component="label" className="upload-button">
            <CloudDownloadIcon />
            Change Photo
            <input
              type="file"
              hidden
              accept="image/jpg,image/jpeg,image/png"
              onChange={handleImageViewer}
            />
          </Button>
        </div>
      </Box>

      {/* PERSONAL INFORMATION */}
      <div className="settings-section-title">
        <h2>Personal Details</h2>
        <p>Your basic account information</p>
      </div>

      <Box className="input-frame">
        <div className="long-input">
          <label className="spec-label">Username</label>

          <input
            className="spec-input mb-nick"
            type="text"
            placeholder={authMember?.memberNick}
            value={memberUpdateInput.memberNick}
            name="memberNick"
            onChange={memberNickHandler}
          />
        </div>
      </Box>

      <Box className="input-frame">
        <div className="short-input">
          <label className="spec-label">Phone Number</label>

          <input
            className="spec-input mb-phone"
            type="text"
            placeholder={authMember?.memberPhone ?? "Enter your phone number"}
            value={memberUpdateInput.memberPhone}
            name="memberPhone"
            onChange={memberPhoneHandler}
          />
        </div>

        <div className="short-input">
          <label className="spec-label">Address</label>

          <input
            className="spec-input mb-address"
            type="text"
            placeholder={authMember?.memberAdress ? authMember.memberAdress : "Enter your address"}
            value={memberUpdateInput.memberAdress}
            name="memberAddress"
            onChange={memberAdressHandler}
          />
        </div>
      </Box>

      <Box className="input-frame">
        <div className="long-input">
          <label className="spec-label">About You</label>

          <textarea
            className="spec-textarea mb-description"
            placeholder={
              authMember?.memberDesc ? authMember.memberDesc : "Tell us something about yourself..."
            }
            value={memberUpdateInput.memberDesc}
            name="memberDesc"
            onChange={memberDescriptionHandler}
          />
        </div>
      </Box>

      {/* SAVE */}
      <Box className="save-box">
        <Button variant="contained" disabled={saving} onClick={handleSubmitButton}>
          Save Changes
        </Button>
      </Box>
    </Box>
  );
}
