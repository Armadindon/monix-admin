import React, { useRef } from "react";
import { Button, IconButton, Modal, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../hook";
import { addSnackbarMessage, changePage } from "../Model/ApplicationSlice";
import sendApiRequest from "../Model/WebApi";
import config from "../config";
import { Product, User } from "../Model/types";
import {
  getEditedProduct,
  getProducts,
  setEditedProduct,
  setProducts,
} from "../Model/ProductSlice";
import BarcodeDecoder from "../Components/BarcodeDecoder";

const EditProduct = () => {
  const user = useSelector(getEditedProduct);
  const products = useSelector(getProducts);
  const dispatch = useAppDispatch();
  const imageRef = useRef<HTMLInputElement>(null);
  // Si l'id de l'utilisateur est égal à -1, c'est que l'on créée un nouvel utilisateur
  const [editedProduct, setLocalEditedProduct] = useState<Partial<Product>>(
    user ||
      ({
        id: -1,
        name: "",
        price: "",
        stock: "",
        barcode: 0,
      } as Partial<User>)
  );
  const [imageFile, setImageFile] = useState<File | undefined>();
  const [scannerModalOpened, setScannerModalOpened] = useState(false);

  const editProduct = async () => {
    //On update le produit
    let response = await sendApiRequest({
      url: `/products/${editedProduct?.id}`,
      method: "PUT",
      data: {
        name: editedProduct?.name,
        price: editedProduct?.price,
        stock: editedProduct?.stock,
        barcode: editedProduct?.barcode ? editedProduct?.barcode : undefined,
      },
    });
    if (response) {
      //On upload l'image en second temps
      if (imageFile) {
        console.log("On upload un fichier");
        const data = new FormData();
        data.append("image", imageFile);

        const imageResponse = await sendApiRequest({
          url: `/products/uploadImage/${editedProduct.id}`,
          data,
          method: "POST",
        });
        response = imageResponse;
      }

      dispatch(setEditedProduct(undefined));
      const productIndex = products?.findIndex(
        (product) => product.id === editedProduct.id
      );
      const newProducts = products?.slice() || [];
      if (productIndex) newProducts[productIndex] = response?.data?.data;
      dispatch(setProducts(newProducts as Product[]));
    }
    dispatch(changePage("products"));
    dispatch(
      addSnackbarMessage({
        message: "Produit modifié ! ✍️",
        options: { variant: "success" },
      })
    );
  };

  const createProduct = async () => {
    //On update le produit
    let response = await sendApiRequest({
      url: `/products/`,
      method: "POST",
      data: {
        name: editedProduct?.name,
        price: editedProduct?.price,
        stock: editedProduct?.stock,
        barcode: editedProduct?.barcode ? editedProduct?.barcode : undefined,
      },
    });
    if (response) {
      //On upload l'image en second temps
      if (imageFile) {
        console.log("On upload un fichier");
        const data = new FormData();
        data.append("image", imageFile);

        const imageResponse = await sendApiRequest({
          url: `/products/uploadImage/${response?.data?.data.id}`,
          data,
          method: "POST",
        });
        response = imageResponse;
      }

      dispatch(setEditedProduct(undefined));
      dispatch(
        setProducts(products?.concat([response?.data.data]) as Product[])
      );
    }
    dispatch(changePage("products"));
    dispatch(
      addSnackbarMessage({
        message: "Produit ajouté ! ✍️",
        options: { variant: "success" },
      })
    );
  };

  return (
    <>
      {editedProduct && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "16px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Modal
            open={scannerModalOpened}
            onClose={() => setScannerModalOpened(false)}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BarcodeDecoder
              onResult={(result) => {
                setScannerModalOpened(false);
                setLocalEditedProduct({
                  ...editedProduct,
                  barcode: result.barcode,
                });
                dispatch(
                  addSnackbarMessage({
                    message: "Code barre trouvé !",
                    options: { variant: "info" },
                  })
                );
              }}
            />
          </Modal>
          <input
            ref={imageRef}
            type="file"
            accept="image/png, image/jpeg"
            onChange={(evt) => {
              if (evt.currentTarget.files)
                setImageFile(evt.currentTarget.files[0]);
            }}
            hidden
          />
          <IconButton onClick={() => imageRef?.current?.click()}>
            <img
              style={{ width: 128, height: 128 }}
              src={
                imageFile
                  ? URL.createObjectURL(imageFile)
                  : editedProduct.image
                  ? `${config.urlBackend}/images/${editedProduct.image}`
                  : "https://via.placeholder.com/128"
              }
            />
          </IconButton>
          <TextField
            label={"Nom"}
            variant="standard"
            value={editedProduct.name || ""}
            sx={{ marginTop: "10px", width: "30ch" }}
            onChange={(evt) =>
              setLocalEditedProduct({
                ...editedProduct,
                name: evt.currentTarget.value,
              })
            }
          />
          <TextField
            label={"Prix"}
            variant="standard"
            type={"number"}
            value={editedProduct.price || 0}
            sx={{ marginTop: "10px", width: "30ch" }}
            onChange={(evt) =>
              setLocalEditedProduct({
                ...editedProduct,
                price: parseFloat(evt.currentTarget.value),
              })
            }
          />
          <TextField
            label={"Stock"}
            variant="standard"
            type={"number"}
            value={editedProduct.stock || 0}
            sx={{ marginTop: "10px", width: "30ch" }}
            onChange={(evt) =>
              setLocalEditedProduct({
                ...editedProduct,
                stock: parseInt(evt.currentTarget.value),
              })
            }
          />
          <TextField
            label={"Code barre"}
            variant="standard"
            value={editedProduct.barcode || ""}
            sx={{ marginTop: "10px", width: "30ch" }}
            onChange={(evt) =>
              setLocalEditedProduct({
                ...editedProduct,
                barcode: evt.currentTarget.value,
              })
            }
          />
          <Button
            variant="contained"
            size="large"
            sx={{ margin: "20px" }}
            onClick={() => setScannerModalOpened(true)}
          >
            Scanner le code barre
          </Button>

          {editedProduct.id !== -1 ? (
            <Button
              variant="contained"
              size="large"
              sx={{ margin: "20px" }}
              onClick={editProduct}
              color="warning"
            >
              Modifier le produit
            </Button>
          ) : (
            <Button
              variant="contained"
              size="large"
              sx={{ margin: "20px" }}
              onClick={createProduct}
            >
              Créer le produit
            </Button>
          )}
        </Box>
      )}
    </>
  );
};

export default EditProduct;
