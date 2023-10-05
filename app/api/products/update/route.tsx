import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prismadb";

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const token = request.headers.get("authorization");
    const {
      productId,
      description,
      active,
      maxPrice,
      minPrice,
      preference,
      product_name,
      quantity,
      slug,
      subCategory,
      productVariant,
    } = body;

    const decodedToken: any = await jwt.verify(
      token || "",
      process.env.JWT_KEY!
    );
    if (decodedToken.role === false) {
      return NextResponse.json(
        { errorType: "Authorization", error: "UnAuthorization" },
        { status: 401 }
      );
    }

    const product = await prisma.product.update({
      where: {
        id: parseInt(productId),
      },
      data: {
        product_name,
        product_references: preference,
        active,
        description,
        maxPrice: parseInt(maxPrice),
        minPrice: parseInt(minPrice),
        quantity: parseInt(quantity),
        slug,
      },
    });
    await prisma.productsVariant.deleteMany({
      where: {
        product_id: parseInt(productId),
      },
    });

    for (var i = 0; i < productVariant.length; i++) {
      const prdVariant = await prisma.productsVariant.create({
        data: {
          product_id: product.id,
          price: productVariant[i].price,
          color: productVariant[i].color,
          quantity: productVariant[i].quantity,
          product_variant_name: productVariant[i].product_variant_name,
        },
      });
      for (var j = 0; j < productVariant[i].images.length; j++) {
        await prisma.productVariantImage.create({
          data: {
            imageUrl: productVariant[i].images[j],
            product_variant_id: prdVariant.id,
          },
        });
      }
      for (var k = 0; k < productVariant[i].size.length; k++) {
        const size = await prisma.size.create({
          data: {
            name_size: productVariant[i].size[k].name_size,
            product_variant_id: prdVariant.id,
          },
        });
        for (
          var m = 0;
          m < productVariant[i].size[k].technical_specification.length;
          m++
        ) {
          await prisma.technicalSpecification.create({
            data: {
              name_technical_specification:
                productVariant[i].size[k].technical_specification[m]
                  .name_technical_specification,
              size_id: size.id,
              value: productVariant[i].size[k].technical_specification[m].value,
            },
          });
        }
      }
    }
    await prisma.productOnSubCategory.deleteMany({
      where: {
        productId: parseInt(productId),
      },
    });
    const subcategory = await prisma.subCategory.findMany({
      where: {
        name: {
          in: subCategory,
        },
      },
    });
    for (var b = 0; b < subcategory.length; b++) {
      await prisma.productOnSubCategory.create({
        data: {
          productId: product.id,
          subcategoryId: subcategory[b].id,
        },
      });
    }

    return NextResponse.json({
      message: "Updated product",
      success: true,
    });
  } catch (error: any) {
    if (error instanceof jwt.TokenExpiredError) {
      return NextResponse.json({
        errorType: "TokenExpired",
        error: "Token has expired",
      });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
