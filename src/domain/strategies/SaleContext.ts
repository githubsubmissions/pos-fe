import SaleStrategy from "./SaleStrategy";

interface SaleContext {
  getStrategy(type: "old" | "new"): SaleStrategy;
}

export default SaleContext;
