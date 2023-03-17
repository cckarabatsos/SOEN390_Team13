import React from "react";
import { Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import "../styles/components/CompanyDescription.css";
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Avatar,
  Stack,
} from "@material-ui/core";
import EditIcon from "@mui/icons-material/Edit";

export default function CompanyDescription(props) {
  return (
    <div className="DescriptionContainer">
      <div className="descriptionHeaderWrap">
        <div className="description">Description</div>
        <div className="editButtonDescription">
          <Button>
            <EditIcon></EditIcon>
          </Button>
        </div>
      </div>

      <div className="descriptionText">
        Hello this is a beautiful random company born in montreal in 1999
      </div>
    </div>
  );
}
