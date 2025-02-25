export const tokenMetadataTemplates = {
  erc20: {
    name: "",
    symbol: "",
    decimals: 18,
    totalSupply: "",
    description: "A fully collateralized token.",
    contractAddress: "",
  },
  erc721: {
    name: "",
    description: "A unique collectible token with special traits.",
    image: "",
    attributes: {
      rarity: "",
      category: "",
      type: "",
    },
    external_url: "",
  },
  erc1155: {
    name: "",
    description: "A set of assets with different properties.",
    tokens: {
      "1": {
        name: "",
        type: "",
        rarity: "",
        image: "",
      },
    },
    external_url: "",
  },
  erc1400: {
    name: "",
    symbol: "",
    description: "A fully regulated security token.",
    totalSupply: "",
    complianceRules: {
      jurisdiction: "",
      whitelistRequired: true,
      transferRestrictions: "Only verified investors can trade",
    },
    issuanceDate: "",
    maturityDate: "",
    external_url: "",
  },
  erc3525: {
    name: "",
    symbol: "",
    description: "A semi-fungible token with value attributes.",
    decimals: 18,
    properties: {
      tokenId: "",
      slot: "",
      value: "",
      attributes: {
        interestRate: "",
        collateral: "",
        vestingSchedule: "",
        riskRating: "",
      },
    },
    image: "",
    external_url: "",
  },
};

export const getMetadataTemplate = (standard: string) => {
  const template =
    tokenMetadataTemplates[standard as keyof typeof tokenMetadataTemplates];
  return template ? JSON.stringify(template, null, 2) : "{}";
};

export const getMetadataDescription = (standard: string): string => {
  switch (standard) {
    case "erc20":
      return "Basic metadata for fungible tokens including name, symbol, and supply.";
    case "erc721":
      return "NFT metadata with image reference and unique attributes.";
    case "erc1155":
      return "Multi-token standard supporting both fungible and non-fungible tokens.";
    case "erc1400":
      return "Security token metadata with compliance and regulatory information.";
    case "erc3525":
      return "Semi-fungible token metadata with value-based attributes.";
    default:
      return "Select a token standard to see metadata format.";
  }
};
