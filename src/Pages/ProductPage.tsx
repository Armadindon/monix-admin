import {
  Button,
  ButtonGroup,
  Checkbox,
  Input,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../hook";
import { useSelector } from "react-redux";
import sendApiRequest from "../Model/WebApi";
import config from "../config";
import Search from "@mui/icons-material/Search";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import Add from "@mui/icons-material/Add";
import { Product } from "../Model/types";
import { addSnackbarMessage, changePage } from "../Model/ApplicationSlice";
import {
  getProducts,
  setEditedProduct,
  setProducts,
} from "../Model/ProductSlice";

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const products = useSelector(getProducts);
  const [selectedProduct, setSelectedProduct] = useState<number[]>([]);
  const [showedProduct, setShowedProduct] = useState<Product[]>(products || []);
  const [search, setSearch] = useState("");

  const updateFilter = () => {
    if (products)
      setShowedProduct(
        products.filter((product) => product.name.includes(search))
      );
  };

  const fetchProducts = async () => {
    const productRequest = await sendApiRequest({
      url: "/products/",
      method: "get",
    });
    dispatch(setProducts(productRequest?.data.data));
    setShowedProduct(productRequest?.data.data);
  };

  const deleteSelectedProducts = async () => {
    for (const productId of selectedProduct)
      sendApiRequest({ url: `/products/${productId}`, method: "DELETE" });

    dispatch(
      dispatch(
        setProducts(
          showedProduct?.filter((prod) => !selectedProduct.includes(prod.id)) ||
            []
        )
      )
    );
    setSelectedProduct([]);
    dispatch(
      addSnackbarMessage({
        message: "Le / Les produit(s) ont bien été supprimés",
        options: { variant: "success" },
      })
    );
  };

  useEffect(() => {
    if (products !== undefined) {
      updateFilter();
      return;
    }
    fetchProducts();
  }, [products]);

  useEffect(() => {
    updateFilter();
  }, [search]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexFlow: "row nowrap",
          justifyContent: "space-between",
          width: "100%",
          height: "50px",
        }}
      >
        <Input
          sx={{ flexGrow: 1, margin: "10px" }}
          value={search}
          onChange={(evt) => {
            setSearch(evt.currentTarget.value);
          }}
          endAdornment={
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          }
        />
        <ButtonGroup variant="contained" sx={{ margin: "10px" }}>
          <Button
            color="success"
            onClick={() => {
              dispatch(setEditedProduct(undefined));
              dispatch(changePage("editProduct"));
            }}
          >
            <Add />
          </Button>
          <Button
            color="warning"
            disabled={selectedProduct.length !== 1}
            onClick={() => {
              const editedProduct = products?.find(
                (product) => product.id === selectedProduct[0]
              );
              dispatch(setEditedProduct(editedProduct));
              dispatch(changePage("editProduct"));
            }}
          >
            <Edit />
          </Button>
          <Button
            color="error"
            disabled={selectedProduct.length === 0}
            onClick={deleteSelectedProducts}
          >
            <Delete />
          </Button>
        </ButtonGroup>
      </div>
      {products && (
        <TableContainer sx={{ height: "85vh" }}>
          <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    onChange={() => {
                      selectedProduct.length !== showedProduct.length
                        ? setSelectedProduct(
                            showedProduct.map((product) => product.id)
                          )
                        : setSelectedProduct([]);
                    }}
                    checked={showedProduct.length === selectedProduct.length}
                    indeterminate={
                      selectedProduct.length !== 0 &&
                      showedProduct.length !== selectedProduct.length
                    }
                  />
                </TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Nom</TableCell>
                <TableCell>Prix</TableCell>
                <TableCell>Stock</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {showedProduct.map((product) => (
                <TableRow
                  key={product.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedProduct.includes(product.id)}
                      onChange={() => {
                        selectedProduct.includes(product.id)
                          ? setSelectedProduct(
                              selectedProduct.filter(
                                (elt) => elt !== product.id
                              )
                            )
                          : setSelectedProduct(
                              selectedProduct.concat([product.id])
                            );
                        console.log(selectedProduct);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <img
                      style={{ width: 128, height: 128 }}
                      src={
                        product.image
                          ? `${config.urlBackend}/images/${product.image}`
                          : "https://via.placeholder.com/128"
                      }
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default ProductsPage;
