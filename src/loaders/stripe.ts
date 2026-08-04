import Stripe from "stripe";
import type { LiveLoader } from "astro/loaders";
import { getSecret } from "astro:env/server";

type Product = { [key in keyof Stripe.Product]: Stripe.Product[key] } & {
  default_price: Stripe.Price;
};

export function productLoader(): LiveLoader<
  Product,
  Pick<Product, "id">,
  Pick<Product, "active"> & { ids: string[] }
> {
  return {
    name: "product-loader",
    loadCollection: async ({ filter }) => {
      try {
        const stripe = new Stripe(getSecret("STRIPE_SECRET_KEY") as string);

        const products = await stripe.products.list({
          active: true,
          expand: ["data.default_price"],
          ...filter,
        });

        return {
          entries: products.data.map((product) => ({
            id: product.id,
            data: product as Product,
          })),
        };
      } catch (error) {
        return {
          error: new Error(`Failed to load plans: ${(error as Error).message}`),
        };
      }
    },
    loadEntry: async ({ filter }) => {
      try {
        const stripe = new Stripe(getSecret("STRIPE_SECRET_KEY") as string);
        const product = await stripe.products.retrieve(filter?.id);

        if (!product) {
          return {
            error: new Error("Product not found"),
          };
        }

        return {
          id: product.id,
          data: product as Product,
        };
      } catch (error) {
        return {
          error: new Error(
            `Failed to load product: ${(error as Error).message}`,
          ),
        };
      }
    },
  };
}

type PaymentLink = {
  [key in keyof Stripe.PaymentLink]: Stripe.PaymentLink[key];
} & {
  line_items: Stripe.ApiList<Stripe.LineItem>;
};

export function paymentLinkLoader(): LiveLoader<
  PaymentLink,
  Pick<PaymentLink, "id">,
  Pick<PaymentLink, "active"> & { productIds: string[] }
> {
  return {
    name: "payment-link-loader",
    loadCollection: async ({ filter }) => {
      try {
        const stripe = new Stripe(getSecret("STRIPE_SECRET_KEY") as string);

        const paymentLinks = await stripe.paymentLinks.list({
          active: true,
          expand: ["data.line_items"],
        });

        return {
          entries: paymentLinks.data
            .filter((link) => {
              return filter?.productIds
                ? filter?.productIds?.includes(
                    link.line_items?.data[0].price?.product as string,
                  )
                : true;
            })
            .map((paymentLink) => ({
              id: paymentLink.id,
              data: paymentLink as PaymentLink,
            })),
        };
      } catch (error) {
        return {
          error: new Error(`Failed to load plans: ${(error as Error).message}`),
        };
      }
    },
    loadEntry: async ({ filter }) => {
      try {
        const stripe = new Stripe(getSecret("STRIPE_SECRET_KEY") as string);
        const paymentLink = await stripe.paymentLinks.retrieve(filter?.id, {
          expand: ["data.line_items"],
        });

        if (!paymentLink) {
          return {
            error: new Error("Payment link not found"),
          };
        }

        return {
          id: paymentLink.id,
          data: paymentLink as PaymentLink,
        };
      } catch (error) {
        return {
          error: new Error(
            `Failed to load payment link: ${(error as Error).message}`,
          ),
        };
      }
    },
  };
}
