import React,{useState} from "react";
import { Button, Icon, IconButton, Dialog, DialogContent, } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import "../styles/components/CompanyDescription.css";
import EditIcon from "@mui/icons-material/Edit";
import CompanyEditDescriptionModal from "./CompanyEditDescriptionModal";

export default function CompanyDescription(props) {
  const description = props.description

  const [descModalOpen, setDescModalOpen] = useState(false)
  const { t } = useTranslation();

  const handleOpenDescModal = () => {
  setDescModalOpen(true);
};

const handleCloseDescModal = () => {
  setDescModalOpen(false);
};



  return (
    <div className="DescriptionContainer">
      <div className="descriptionHeaderWrap">
        <div className="description">Description</div>
        <div className="editButtonDescription">
          <Button onClick={handleOpenDescModal}>
            <EditIcon></EditIcon>
          </Button>
        </div>
      </div>

      <div className="descriptionText">
      {description}
      </div>


      <Dialog open={descModalOpen} onClose={handleCloseDescModal} fullWidth
  maxWidth="md">
        <DialogContent>
          <CompanyEditDescriptionModal  handleCloseModal={handleCloseDescModal} setUpdateFlag={props.setUpdateFlag} updateFlag={props.updateFlag} descriptionText={description} userData={props.userData}></CompanyEditDescriptionModal>
          <Button onClick={handleCloseDescModal}>{t("CancelText")}</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
