/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation CartAddItem($cartId: ID!, $productId: ID!, $total: Int!) {\n  upsertOrderItem(\n    upsert: {create: {quantity: 1, total: $total, order: {connect: {id: $cartId}}, product: {connect: {id: $productId}}}, update: {total: 999, quantity: 2, order: {connect: {id: $cartId}}, product: {connect: {id: $productId}}}}\n    where: {id: $cartId}\n  ) {\n    id\n    quantity\n    product {\n      name\n    }\n  }\n}": types.CartAddItemDocument,
    "mutation CartChangeItemQuantity($quantity: Int!, $itemId: ID!) {\n  updateOrderItem(data: {quantity: $quantity}, where: {id: $itemId}) {\n    quantity\n    id\n  }\n}": types.CartChangeItemQuantityDocument,
    "mutation CartCreate {\n  createOrder(data: {total: 0}) {\n    id\n  }\n}": types.CartCreateDocument,
    "query CartGetById($id: ID!) {\n  order(where: {id: $id}, stage: DRAFT) {\n    id\n    orderItems {\n      id\n      quantity\n      product {\n        ...ProductListItem\n      }\n    }\n  }\n}": types.CartGetByIdDocument,
    "mutation CartRemoveItem($itemId: ID!) {\n  deleteOrderItem(where: {id: $itemId}) {\n    id\n  }\n}": types.CartRemoveItemDocument,
    "query CategoriesGetList {\n  categories {\n    ...CategoryListItem\n  }\n}": types.CategoriesGetListDocument,
    "fragment CategoryListItem on Category {\n  id\n  name\n  slug\n  image {\n    url\n  }\n}": types.CategoryListItemFragmentDoc,
    "query CollectionsGetList {\n  collections {\n    ...CollectionListItem\n  }\n}": types.CollectionsGetListDocument,
    "fragment CollectionListItem on Collection {\n  id\n  name\n  slug\n  image {\n    url\n  }\n}": types.CollectionListItemFragmentDoc,
    "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    ...ProductListItem\n  }\n}": types.ProductGetByIdDocument,
    "fragment ProductListItem on Product {\n  id\n  name\n  categories(first: 1) {\n    name\n  }\n  images(first: 1) {\n    url\n  }\n  price\n}": types.ProductListItemFragmentDoc,
    "query ProductsGetList($first: Int, $skip: Int) {\n  products(first: $first, skip: $skip) {\n    ...ProductListItem\n  }\n}": types.ProductsGetListDocument,
    "query ProductsGetListByCategorySlug($categorySlug: String!, $first: Int, $skip: Int) {\n  products(\n    where: {categories_some: {slug: $categorySlug}}\n    first: $first\n    skip: $skip\n  ) {\n    ...ProductListItem\n  }\n}": types.ProductsGetListByCategorySlugDocument,
    "query ProductsGetListByCollectionSlug($collectionSlug: String!, $first: Int, $skip: Int) {\n  products(\n    where: {collections_some: {slug: $collectionSlug}}\n    first: $first\n    skip: $skip\n  ) {\n    ...ProductListItem\n  }\n}": types.ProductsGetListByCollectionSlugDocument,
    "query ProductsGetListByNameOrCategoryName($query: String!) {\n  products(where: {name_contains: $query}) {\n    ...ProductListItem\n  }\n}": types.ProductsGetListByNameOrCategoryNameDocument,
    "query ProductsGetSuggestedList($collectionSlug: String, $categorySlug: String, $id: ID!) {\n  products(\n    first: 4\n    where: {collections_some: {slug_contains: $collectionSlug}, OR: {categories_some: {slug_contains: $categorySlug}, id_not: $id}}\n  ) {\n    ...ProductListItem\n  }\n}": types.ProductsGetSuggestedListDocument,
    "query ProductsGetTotalCount {\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetTotalCountDocument,
    "query ProductsGetTotalCountByCategorySlug($categorySlug: String) {\n  productsConnection(where: {categories_some: {slug: $categorySlug}}) {\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetTotalCountByCategorySlugDocument,
    "query SingleProductGetItemById($id: ID!) {\n  product(where: {id: $id}) {\n    id\n    name\n    price\n    collections(first: 1) {\n      name\n      slug\n    }\n    categories(first: 1) {\n      name\n      slug\n    }\n    images(first: 1) {\n      url\n    }\n    description\n  }\n}": types.SingleProductGetItemByIdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartAddItem($cartId: ID!, $productId: ID!, $total: Int!) {\n  upsertOrderItem(\n    upsert: {create: {quantity: 1, total: $total, order: {connect: {id: $cartId}}, product: {connect: {id: $productId}}}, update: {total: 999, quantity: 2, order: {connect: {id: $cartId}}, product: {connect: {id: $productId}}}}\n    where: {id: $cartId}\n  ) {\n    id\n    quantity\n    product {\n      name\n    }\n  }\n}"): typeof import('./graphql').CartAddItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartChangeItemQuantity($quantity: Int!, $itemId: ID!) {\n  updateOrderItem(data: {quantity: $quantity}, where: {id: $itemId}) {\n    quantity\n    id\n  }\n}"): typeof import('./graphql').CartChangeItemQuantityDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartCreate {\n  createOrder(data: {total: 0}) {\n    id\n  }\n}"): typeof import('./graphql').CartCreateDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CartGetById($id: ID!) {\n  order(where: {id: $id}, stage: DRAFT) {\n    id\n    orderItems {\n      id\n      quantity\n      product {\n        ...ProductListItem\n      }\n    }\n  }\n}"): typeof import('./graphql').CartGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartRemoveItem($itemId: ID!) {\n  deleteOrderItem(where: {id: $itemId}) {\n    id\n  }\n}"): typeof import('./graphql').CartRemoveItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CategoriesGetList {\n  categories {\n    ...CategoryListItem\n  }\n}"): typeof import('./graphql').CategoriesGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment CategoryListItem on Category {\n  id\n  name\n  slug\n  image {\n    url\n  }\n}"): typeof import('./graphql').CategoryListItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CollectionsGetList {\n  collections {\n    ...CollectionListItem\n  }\n}"): typeof import('./graphql').CollectionsGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment CollectionListItem on Collection {\n  id\n  name\n  slug\n  image {\n    url\n  }\n}"): typeof import('./graphql').CollectionListItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    ...ProductListItem\n  }\n}"): typeof import('./graphql').ProductGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductListItem on Product {\n  id\n  name\n  categories(first: 1) {\n    name\n  }\n  images(first: 1) {\n    url\n  }\n  price\n}"): typeof import('./graphql').ProductListItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetList($first: Int, $skip: Int) {\n  products(first: $first, skip: $skip) {\n    ...ProductListItem\n  }\n}"): typeof import('./graphql').ProductsGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetListByCategorySlug($categorySlug: String!, $first: Int, $skip: Int) {\n  products(\n    where: {categories_some: {slug: $categorySlug}}\n    first: $first\n    skip: $skip\n  ) {\n    ...ProductListItem\n  }\n}"): typeof import('./graphql').ProductsGetListByCategorySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetListByCollectionSlug($collectionSlug: String!, $first: Int, $skip: Int) {\n  products(\n    where: {collections_some: {slug: $collectionSlug}}\n    first: $first\n    skip: $skip\n  ) {\n    ...ProductListItem\n  }\n}"): typeof import('./graphql').ProductsGetListByCollectionSlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetListByNameOrCategoryName($query: String!) {\n  products(where: {name_contains: $query}) {\n    ...ProductListItem\n  }\n}"): typeof import('./graphql').ProductsGetListByNameOrCategoryNameDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetSuggestedList($collectionSlug: String, $categorySlug: String, $id: ID!) {\n  products(\n    first: 4\n    where: {collections_some: {slug_contains: $collectionSlug}, OR: {categories_some: {slug_contains: $categorySlug}, id_not: $id}}\n  ) {\n    ...ProductListItem\n  }\n}"): typeof import('./graphql').ProductsGetSuggestedListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetTotalCount {\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsGetTotalCountDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetTotalCountByCategorySlug($categorySlug: String) {\n  productsConnection(where: {categories_some: {slug: $categorySlug}}) {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsGetTotalCountByCategorySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query SingleProductGetItemById($id: ID!) {\n  product(where: {id: $id}) {\n    id\n    name\n    price\n    collections(first: 1) {\n      name\n      slug\n    }\n    categories(first: 1) {\n      name\n      slug\n    }\n    images(first: 1) {\n      url\n    }\n    description\n  }\n}"): typeof import('./graphql').SingleProductGetItemByIdDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
