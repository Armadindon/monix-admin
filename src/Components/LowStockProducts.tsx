import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { getProducts, setProducts } from "../Model/ProductSlice";
import sendApiRequest from "../Model/WebApi";
import { useAppDispatch } from "../hook";
import { Product } from "../Model/types";

const LowStockProducts = () => {
  const dispatch = useAppDispatch();
  const products = useSelector(getProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(
    products?.filter((prd) => prd.stock <= 5) || []
  );

  useEffect(() => {
    if (products !== undefined) {
      setFilteredProducts(products?.filter((prd) => prd.stock <= 5) || []);
      return;
    }
    fetchProducts();
  }, [products]);

  const fetchProducts = async () => {
    const productRequest = await sendApiRequest({
      url: "/products/",
      method: "get",
    });
    dispatch(setProducts(productRequest?.data.data));
  };

  return (
    <Paper
      elevation={3}
      sx={{ width: "500px", height: "300px", padding: "10px" }}
    >
      <Typography variant="h6">Produit avec un stock faible</Typography>
      <TableContainer component={Paper}>
        <Table
          stickyHeader
          sx={{ width: "100%", height: "100%" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell align="right">Stock</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts?.map((product) => (
              <TableRow
                key={product.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {product.name}
                </TableCell>
                <TableCell align="right">{product.stock}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default LowStockProducts;
