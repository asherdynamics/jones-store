import Image from "next/image";
import { CartItem, Product } from "@prisma/client";

import NumberInput from "./common/formControls/NumberInput";
import Button from "./common/formControls/Button";

import { currencyFormatter } from "@Lib/intl";
import React from "react";

export default function CartProductItem({
  product,
  cartItem,
  index,
  removeAction,
  updateAction,
}: PropTypes) {
  if (!cartItem || !product) {
    return null;
  }
  return (
    <li
      className="cart__product"
      style={{ "--index": index } as React.CSSProperties}
    >
      <Image
        className="cart__product-image"
        objectFit="contain"
        objectPosition="bottom"
        src={product.mediaURLs[0]}
        width={110}
        height={110}
        layout="fixed"
        alt=""
      />
      <span className="cart__product-title">{product.title}</span>
      <span className="cart__product-gender">{product.gender}</span>
      <span className="cart__product-size">Size: {cartItem.size}</span>
      <span className="cart__product-price">
        {currencyFormatter.format(product.price - product.discount)}
      </span>
      <span className="cart__product-cost">
        {currencyFormatter.format(
          (product.price - product.discount) * cartItem.quantity
        )}
      </span>
      <NumberInput
        className="cart__product-quantity"
        value={cartItem.quantity}
        min={1}
        max={product.stockQty}
        onChange={(value) => updateAction(value)}
      />
      <Button onClick={removeAction} className="cart__product-remove">
        Remove
      </Button>
    </li>
  );
}

interface PropTypes {
  product: Product;
  cartItem: CartItem;
  index: number;
  removeAction: () => void;
  updateAction: (quantity: number) => void;
}
