import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, MinusCircle } from "lucide-react";
import ProjectSelector from "./ProjectSelector";
import MetadataEditor from "./MetadataEditor";

interface TokenBlock {
  id: string;
  name: string;
  symbol: string;
  standard: string;
  decimals: string;
  totalSupply: string;
  metadata: string;
  ratio: string;
}

const defaultMetadata = {
  name: "",
  symbol: "",
  description: "",
  decimals: 18,
  properties: {
    attributes: {
      interestRate: "",
      lockupPeriod: "",
      issuer: "Chain Capital",
      collateralType: "",
      redemptionSchedule: "",
      stakingMechanism: "",
      riskRating: "",
    },
  },
  image: "",
  external_url: "",
};

export default function TokenConfiguration() {
  const [tokenBlocks, setTokenBlocks] = useState<TokenBlock[]>([
    {
      id: "1",
      name: "",
      symbol: "",
      standard: "",
      decimals: "18",
      totalSupply: "",
      metadata: JSON.stringify(defaultMetadata, null, 2),
      ratio: "1",
    },
  ]);

  const addTokenBlock = () => {
    setTokenBlocks([
      ...tokenBlocks,
      {
        id: String(tokenBlocks.length + 1),
        name: "",
        symbol: "",
        standard: "",
        decimals: "18",
        totalSupply: "",
        metadata: JSON.stringify(defaultMetadata, null, 2),
        ratio: "1",
      },
    ]);
  };

  const removeTokenBlock = (id: string) => {
    if (tokenBlocks.length > 1) {
      setTokenBlocks(tokenBlocks.filter((block) => block.id !== id));
    }
  };

  const updateTokenBlock = (
    id: string,
    field: keyof TokenBlock,
    value: string,
  ) => {
    setTokenBlocks(
      tokenBlocks.map((block) =>
        block.id === id ? { ...block, [field]: value } : block,
      ),
    );
  };

  return (
    <div className="space-y-6">
      <ProjectSelector
        onProjectSelect={(projectId) => {
          console.log("Selected project:", projectId);
          // Here you would load the project's token configuration
        }}
      />

      {/* Status Banner */}
      <div className="flex items-center justify-between bg-muted p-4 rounded-lg">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Design Your Token</h2>
          <p className="text-sm text-muted-foreground">
            Configure token building blocks and their relationships
          </p>
        </div>
        <Badge variant="outline">Draft</Badge>
      </div>

      {/* Token Building Blocks */}
      {tokenBlocks.map((block, index) => (
        <Card key={block.id} className="relative">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Token Building Block {block.id}</CardTitle>
                <CardDescription>Configure token parameters</CardDescription>
              </div>
              <div className="flex gap-2">
                {index === 0 && (
                  <Button variant="outline" size="icon" onClick={addTokenBlock}>
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                )}
                {index > 0 && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeTokenBlock(block.id)}
                  >
                    <MinusCircle className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>Token Name</Label>
                <Input
                  value={block.name}
                  onChange={(e) =>
                    updateTokenBlock(block.id, "name", e.target.value)
                  }
                  placeholder="Enter token name"
                />
              </div>

              <div className="grid gap-2">
                <Label>Token Symbol</Label>
                <Input
                  value={block.symbol}
                  onChange={(e) =>
                    updateTokenBlock(block.id, "symbol", e.target.value)
                  }
                  placeholder="Enter token symbol"
                />
              </div>

              <div className="grid gap-2">
                <Label>Token Standard</Label>
                <Select
                  value={block.standard}
                  onValueChange={(value) =>
                    updateTokenBlock(block.id, "standard", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select token standard" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="erc20">ERC-20</SelectItem>
                    <SelectItem value="erc721">ERC-721</SelectItem>
                    <SelectItem value="erc1155">ERC-1155</SelectItem>
                    <SelectItem value="erc1400">ERC-1400</SelectItem>
                    <SelectItem value="erc3525">ERC-3525</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Decimals</Label>
                <Select
                  value={block.decimals}
                  onValueChange={(value) =>
                    updateTokenBlock(block.id, "decimals", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select decimals" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(19)].map((_, i) => (
                      <SelectItem key={i} value={String(i)}>
                        {i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Total Supply</Label>
                <Input
                  type="number"
                  value={block.totalSupply}
                  onChange={(e) =>
                    updateTokenBlock(block.id, "totalSupply", e.target.value)
                  }
                  placeholder="Enter total supply"
                />
              </div>

              {index > 0 && (
                <div className="grid gap-2">
                  <Label>Ratio to Block 1</Label>
                  <Input
                    type="text"
                    value={block.ratio}
                    onChange={(e) =>
                      updateTokenBlock(block.id, "ratio", e.target.value)
                    }
                    placeholder="Enter ratio (e.g., 1:1000)"
                  />
                </div>
              )}

              <div className="grid gap-2">
                <Label>Metadata</Label>
                <MetadataEditor
                  metadata={block.metadata}
                  standard={block.standard}
                  onChange={(value) =>
                    updateTokenBlock(block.id, "metadata", value)
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline">Save as Draft</Button>
        <Button>Continue to Compliance</Button>
      </div>
    </div>
  );
}
