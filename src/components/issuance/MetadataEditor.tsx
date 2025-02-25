import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle, Eye, RefreshCcw, Plus, Minus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

interface MetadataEditorProps {
  metadata: string;
  standard: string;
  onChange: (value: string) => void;
}

const SANCTIONED_JURISDICTIONS = [
  "Cuba",
  "Iran",
  "North Korea",
  "Syria",
  "Russia",
  "Crimea (Ukraine)",
  "Donetsk (Ukraine)",
  "Luhansk (Ukraine)",
  "Belarus",
  "Myanmar (Burma)",
  "Venezuela",
  "Zimbabwe",
  "Democratic Republic of the Congo",
  "Iraq",
  "Lebanon",
  "Libya",
  "Somalia",
  "Sudan",
  "Yemen",
];

const ERC1155_TOKEN_TYPES = ["Fungible", "Semi-Fungible", "Non-Fungible"];

interface ERC1155Token {
  tokenId: string;
  name: string;
  type: string;
  amount: string;
  maxSupply: string;
  burnable: boolean;
  transferable: boolean;
  uri: string;
  attributes: Record<string, string>;
}

interface FieldConfig {
  label: string;
  tooltip: string;
  type: "text" | "number" | "textarea";
  path: string[];
}

const standardFields: Record<string, FieldConfig[]> = {
  erc20: [
    {
      label: "Description",
      tooltip: "A brief description of the token",
      type: "textarea",
      path: ["description"],
    },
    {
      label: "Contract Address",
      tooltip: "The deployed smart contract address",
      type: "text",
      path: ["contractAddress"],
    },
  ],
  erc721: [
    {
      label: "Description",
      tooltip: "Description of the NFT collection",
      type: "textarea",
      path: ["description"],
    },
    {
      label: "Image URL",
      tooltip: "URL pointing to the NFT image",
      type: "text",
      path: ["image"],
    },
    {
      label: "External URL",
      tooltip: "Link to the NFT's webpage",
      type: "text",
      path: ["external_url"],
    },
    {
      label: "Rarity",
      tooltip: "NFT rarity level",
      type: "text",
      path: ["attributes", "rarity"],
    },
    {
      label: "Category",
      tooltip: "NFT category",
      type: "text",
      path: ["attributes", "category"],
    },
  ],
  erc3525: [
    {
      label: "Description",
      tooltip: "Description of the semi-fungible token",
      type: "textarea",
      path: ["description"],
    },
    {
      label: "Interest Rate",
      tooltip: "Annual interest rate",
      type: "text",
      path: ["properties", "attributes", "interestRate"],
    },
    {
      label: "Collateral",
      tooltip: "Type of collateral",
      type: "text",
      path: ["properties", "attributes", "collateral"],
    },
    {
      label: "Vesting Schedule",
      tooltip: "Token vesting period",
      type: "text",
      path: ["properties", "attributes", "vestingSchedule"],
    },
    {
      label: "Risk Rating",
      tooltip: "Credit risk rating",
      type: "text",
      path: ["properties", "attributes", "riskRating"],
    },
  ],
};

const getFieldValue = (obj: any, path: string[]): string => {
  let value = obj;
  for (const key of path) {
    if (!value || typeof value !== "object") return "";
    value = value[key];
  }
  return value || "";
};

export default function MetadataEditor({
  metadata,
  standard,
  onChange,
}: MetadataEditorProps) {
  const [parsedMetadata, setParsedMetadata] = useState<any>({});
  const [jsonError, setJsonError] = useState<string>("");
  const [selectedJurisdictions, setSelectedJurisdictions] = useState<string[]>(
    [],
  );
  const [erc1155Tokens, setErc1155Tokens] = useState<
    Record<string, ERC1155Token>
  >({});

  useEffect(() => {
    try {
      const parsed = JSON.parse(metadata);
      setParsedMetadata(parsed);
      if (standard === "erc1155" && parsed.tokens) {
        setErc1155Tokens(parsed.tokens);
      }
      if (
        standard === "erc1400" &&
        parsed.complianceRules?.restrictedJurisdictions
      ) {
        setSelectedJurisdictions(
          parsed.complianceRules.restrictedJurisdictions,
        );
      }
      setJsonError("");
    } catch (e) {
      setJsonError("Invalid JSON format");
    }
  }, [metadata, standard]);

  const updateField = (path: string[], value: any) => {
    const newMetadata = { ...parsedMetadata };
    let current = newMetadata;

    for (let i = 0; i < path.length - 1; i++) {
      if (!current[path[i]]) current[path[i]] = {};
      current = current[path[i]];
    }

    current[path[path.length - 1]] = value;
    onChange(JSON.stringify(newMetadata, null, 2));
  };

  const addErc1155Token = () => {
    const tokenId = String(Object.keys(erc1155Tokens).length + 1);
    const newToken: ERC1155Token = {
      tokenId,
      name: "",
      type: "Fungible",
      amount: "0",
      maxSupply: "0",
      burnable: true,
      transferable: true,
      uri: "",
      attributes: {},
    };
    const newTokens = { ...erc1155Tokens, [tokenId]: newToken };
    setErc1155Tokens(newTokens);
    updateField(["tokens"], newTokens);
  };

  const updateErc1155Token = (
    tokenId: string,
    field: keyof ERC1155Token,
    value: any,
  ) => {
    const newTokens = {
      ...erc1155Tokens,
      [tokenId]: {
        ...erc1155Tokens[tokenId],
        [field]: value,
      },
    };
    setErc1155Tokens(newTokens);
    updateField(["tokens"], newTokens);
  };

  const removeErc1155Token = (tokenId: string) => {
    const newTokens = { ...erc1155Tokens };
    delete newTokens[tokenId];
    setErc1155Tokens(newTokens);
    updateField(["tokens"], newTokens);
  };

  const refreshMetadata = () => {
    onChange(JSON.stringify(parsedMetadata, null, 2));
  };

  if (standard === "erc1155") {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Label className="text-base font-semibold">
            ERC-1155 Token Collection
          </Label>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={refreshMetadata}>
              <RefreshCcw className="h-4 w-4" />
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Token Collection Preview</DialogTitle>
                </DialogHeader>
                <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-[500px]">
                  {JSON.stringify(parsedMetadata, null, 2)}
                </pre>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Button onClick={addErc1155Token} className="w-full">
          <Plus className="h-4 w-4 mr-2" /> Add Token
        </Button>

        {Object.entries(erc1155Tokens).map(([tokenId, token]) => (
          <Card key={tokenId}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Token #{tokenId}</h3>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeErc1155Token(tokenId)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label>Token Type</Label>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    value={token.type}
                    onChange={(e) =>
                      updateErc1155Token(tokenId, "type", e.target.value)
                    }
                  >
                    {ERC1155_TOKEN_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-2">
                  <Label>Name</Label>
                  <Input
                    value={token.name}
                    onChange={(e) =>
                      updateErc1155Token(tokenId, "name", e.target.value)
                    }
                    placeholder="Token name"
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Amount</Label>
                  <Input
                    type="number"
                    value={token.amount}
                    onChange={(e) =>
                      updateErc1155Token(tokenId, "amount", e.target.value)
                    }
                    placeholder="Initial amount"
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Maximum Supply</Label>
                  <Input
                    type="number"
                    value={token.maxSupply}
                    onChange={(e) =>
                      updateErc1155Token(tokenId, "maxSupply", e.target.value)
                    }
                    placeholder="Maximum supply (0 for unlimited)"
                  />
                </div>

                <div className="grid gap-2">
                  <Label>URI (Metadata URL)</Label>
                  <Input
                    value={token.uri}
                    onChange={(e) =>
                      updateErc1155Token(tokenId, "uri", e.target.value)
                    }
                    placeholder="https://example.com/metadata/{id}.json"
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`burnable-${tokenId}`}
                      checked={token.burnable}
                      onCheckedChange={(checked) =>
                        updateErc1155Token(tokenId, "burnable", checked)
                      }
                    />
                    <label htmlFor={`burnable-${tokenId}`}>Burnable</label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`transferable-${tokenId}`}
                      checked={token.transferable}
                      onCheckedChange={(checked) =>
                        updateErc1155Token(tokenId, "transferable", checked)
                      }
                    />
                    <label htmlFor={`transferable-${tokenId}`}>
                      Transferable
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (standard === "erc1400") {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Label className="text-base font-semibold">
            Security Token Configuration
          </Label>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={refreshMetadata}>
              <RefreshCcw className="h-4 w-4" />
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Security Token Preview</DialogTitle>
                </DialogHeader>
                <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-[500px]">
                  {JSON.stringify(parsedMetadata, null, 2)}
                </pre>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label>Description</Label>
            <Textarea
              value={parsedMetadata.description || ""}
              onChange={(e) => updateField(["description"], e.target.value)}
              placeholder="Security token description"
            />
          </div>

          <div className="grid gap-4">
            <Label>Issuance Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  {parsedMetadata.issuanceDate
                    ? format(new Date(parsedMetadata.issuanceDate), "PPP")
                    : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={
                    parsedMetadata.issuanceDate
                      ? new Date(parsedMetadata.issuanceDate)
                      : undefined
                  }
                  onSelect={(date) =>
                    updateField(["issuanceDate"], date?.toISOString())
                  }
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid gap-4">
            <Label>Maturity Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  {parsedMetadata.maturityDate
                    ? format(new Date(parsedMetadata.maturityDate), "PPP")
                    : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={
                    parsedMetadata.maturityDate
                      ? new Date(parsedMetadata.maturityDate)
                      : undefined
                  }
                  onSelect={(date) =>
                    updateField(["maturityDate"], date?.toISOString())
                  }
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Restricted Jurisdictions</Label>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedJurisdictions(SANCTIONED_JURISDICTIONS);
                    updateField(
                      ["complianceRules", "restrictedJurisdictions"],
                      SANCTIONED_JURISDICTIONS,
                    );
                  }}
                >
                  Select All
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedJurisdictions([]);
                    updateField(
                      ["complianceRules", "restrictedJurisdictions"],
                      [],
                    );
                  }}
                >
                  Deselect All
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4">
                  {SANCTIONED_JURISDICTIONS.map((jurisdiction) => (
                    <div
                      key={jurisdiction}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={jurisdiction}
                        checked={selectedJurisdictions.includes(jurisdiction)}
                        onCheckedChange={(checked) => {
                          const newSelection = checked
                            ? [...selectedJurisdictions, jurisdiction]
                            : selectedJurisdictions.filter(
                                (j) => j !== jurisdiction,
                              );
                          setSelectedJurisdictions(newSelection);
                          updateField(
                            ["complianceRules", "restrictedJurisdictions"],
                            newSelection,
                          );
                        }}
                      />
                      <label
                        htmlFor={jurisdiction}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {jurisdiction}
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Default editor for other token standards
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label className="text-base font-semibold">Metadata Editor</Label>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={refreshMetadata}>
            <RefreshCcw className="h-4 w-4" />
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Eye className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Metadata Preview</DialogTitle>
              </DialogHeader>
              <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-[500px]">
                {JSON.stringify(parsedMetadata, null, 2)}
              </pre>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {jsonError && <div className="text-red-500 text-sm">{jsonError}</div>}

      <div className="grid gap-4">
        {standardFields[standard]?.map((field, index) => (
          <div key={index} className="grid gap-2">
            <div className="flex items-center gap-2">
              <Label>{field.label}</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{field.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            {field.type === "textarea" ? (
              <Textarea
                value={getFieldValue(parsedMetadata, field.path)}
                onChange={(e) => updateField(field.path, e.target.value)}
                placeholder={`Enter ${field.label.toLowerCase()}`}
              />
            ) : (
              <Input
                type={field.type}
                value={getFieldValue(parsedMetadata, field.path)}
                onChange={(e) => updateField(field.path, e.target.value)}
                placeholder={`Enter ${field.label.toLowerCase()}`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
