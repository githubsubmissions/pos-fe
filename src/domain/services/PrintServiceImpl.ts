import CurrencyFormatterServiceImpl from "./CurrencyFormatterServiceImpl";
import DateFormatterServiceImpl from "./DateFormatterServiceImpl";
import Sale from "../entities/Sale";
import ReportDetail from "../entities/ReportDetail";
import {ReportResponse} from "../responses/ReportResponse";
import {PrintService} from "./PrintService";
import {toast} from "react-toastify";

const typeDelimiter = "-";
const fourSpaceTab = "&emsp;";
const twoSpaceTab = "&ensp;";
const singleSpace = "&nbsp;";
const newLine = "<br>";


const convertArrayOfObjectsToPrint = (header: any, body: any, footer: any) => {
  body.sort((a: { itemDo: any }, b: { itemDo: any; }) => (a.itemDo.name > b.itemDo.name ? 1 : -1));

  const itemNameLength = 15;

  let result = header + newLine + newLine;
  result +=
    `<table style='font-size: 15px; border-collapse: collapse; border:1px solid'>
          <tr style='border:1px solid'>
            <th style="text-align: left;border:1px solid;">Item</th><th>Ty</th><th>Qty</th><th>SubT</th>
          </tr>
         <tbody>`;

  for (let i = 0; i < body.length; i++) {
    let shortItemName = body[i].itemDo.name.substring(0, itemNameLength);
    result +=
      `<tr>
                <td style="border:1px solid">${shortItemName}</td>
                <td style="border:1px solid">${typeDelimiter}${body[i].itemDo.itemCategoryDo.name.substring(0, 1)}</td>
                <td style="border:1px solid">${body[i].quantity}</td>
                <td style="border:1px solid" style="text-align: right;">${(body[i].quantity * body[i].price).toFixed(2)}</td>
        </tr>`;
  }
  result += `</tbody></table>`;
  result += footer;

  return result;
};

const convertReportDataToPrint = (header: any, saleData: any, footer: any) => {
  saleData.sort((a: any, b: any) => a.name.localeCompare(b.name))

  const itemNameLength = 15;

  let result = header + newLine + newLine;
  result +=
    `<table style='font-size: 15px; border-collapse: collapse; border:1px solid'>
          <tr style='border:1px solid'>
            <th style="text-align: left;border:1px solid">Item</th><th>Ty</th><th>Qty</th><th>SubT</th>
          </tr>
         <tbody>`;

  for (let i = 0; i < saleData.length; i++) {
    let shortItemName = saleData[i].name.substring(0, itemNameLength);
    result +=
      `<tr>
                <td style="border:1px solid">${shortItemName}</td>
                <td style="border:1px solid">${typeDelimiter}${saleData[i].category.substring(0, 1)}</td>
                <td style="border:1px solid">${saleData[i].quantitySold}</td>
                <td style="border:1px solid" style="text-align: right;">${(saleData[i].quantitySold * saleData[i].price).toFixed(2)}</td>
        </tr>`;
  }
  result += `</tbody></table>`;
  result += footer;

  return result;
};

export default class PrintServiceImpl implements PrintService {
  private readonly currencyFormatterService: CurrencyFormatterServiceImpl
  private readonly dateFormatterService: DateFormatterServiceImpl

  public constructor(currencyFormatterService: CurrencyFormatterServiceImpl, dateFormatterService: DateFormatterServiceImpl) {
    this.currencyFormatterService = currencyFormatterService;
    this.dateFormatterService = dateFormatterService;
  }

  printReceipt(saleData: Sale, paying: number) {

    const cashierName = saleData.employeeDo.userDo.firstname + " " + saleData.employeeDo.userDo.lastname;
    const grandTotal = saleData.grandTotal < 0 ? 0 : this.currencyFormatterService.format(saleData.grandTotal);
    const subTotal = saleData.grandTotal < 0 ? 0 : this.currencyFormatterService.format(saleData.subTotal);
    const taxes = saleData.taxes.VAT
    const taxAmount = ((typeof grandTotal === "string") ? parseFloat(grandTotal) : grandTotal) -
      ((typeof subTotal === "string") ? parseFloat(subTotal) : subTotal);

    const change = paying - ((typeof grandTotal === "string") ? parseFloat(grandTotal) : grandTotal);
    const phone = '050-248-0435';
    const email = 'delcoker@gmail.com'

    const companyName = process.env.REACT_APP_COMPANY_SHORT_NAME

    let company = companyName /*+ " - " + localStorage.getItem("tp_name")*/ + newLine;
    let cashierDetail = "Cashier: " + (cashierName).substring(-company.length);
    let header = company + cashierDetail;
    header += newLine + saleData.paymentMethod.toUpperCase();
    saleData.paymentMethod.toUpperCase() !== "CASH" ? header += newLine + "payment_detail" : header += "";

    const fourSpaceTabRepeat = 2;
    const GRAND_TOTAL = `Grand Total:${fourSpaceTab.repeat(4 - fourSpaceTabRepeat)}${grandTotal}${newLine}`;
    const SUB_TOTAL = `Sub Total:${fourSpaceTab.repeat(5 - fourSpaceTabRepeat)}${subTotal}${newLine}`;
    const TAX_PERCENTAGE = `Tax :${fourSpaceTab.repeat(7 - fourSpaceTabRepeat)}${taxes}${twoSpaceTab}%${newLine}`;
    const TAX_AMOUNT = `Tax Amount :${fourSpaceTab.repeat(3 - fourSpaceTabRepeat)}${twoSpaceTab}${taxAmount.toFixed(2)}${newLine}`;
    const PAID = `Paid :${fourSpaceTab.repeat(6 - fourSpaceTabRepeat)}${twoSpaceTab}${singleSpace}${paying.toFixed(2)}${newLine}`;
    const CHANGE = `Change :${fourSpaceTab.repeat(5 - fourSpaceTabRepeat)}<strong>${singleSpace}${singleSpace}${change.toFixed(2)}</strong>${newLine}${newLine}`;
    const DATE = `${this.dateFormatterService.format(new Date().toJSON())}${newLine}`;
    const REMARK = `Items valid for the day.${newLine}`;

    let footer = `${newLine}
                        ${GRAND_TOTAL}
                        ${SUB_TOTAL}
                        ${TAX_PERCENTAGE}
                        ${TAX_AMOUNT}
                        ${PAID}
                        ${CHANGE}
                        ${phone}${newLine}
                        ${email}${newLine}
                        ${DATE}
                        ${REMARK}`;

    let content = convertArrayOfObjectsToPrint(
      header,
      saleData.saleDetails,
      footer
    );

    const element = document!.getElementById("contents_to_print") as HTMLIFrameElement;
    const printWindow = element.contentWindow!;
    printWindow.document.open();
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  }

  printReport(saleRequest: any, response: ReportResponse) {

    const startDate = this.dateFormatterService.format(saleRequest.startDate);
    const endDate = this.dateFormatterService.format(saleRequest.endDate);
    const paymentMethod = saleRequest.paymentMethod;
    const reportOn = response.report.employees.reduce((result: string[], {userDo: {firstname, lastname}}: any) => {
      result.push(`${firstname} ${lastname}`);
      return result;
    }, []).join(`<br>${fourSpaceTab.repeat(4)}  - `);

    const saleData = response.reportDetail.map((reportDetail: ReportDetail) => (
      {
        id: reportDetail.lastSaleDetailId,
        name: reportDetail.itemDo.name,
        category: reportDetail.itemDo.itemCategoryDo.name,
        quantitySold: reportDetail.quantity,
        price: reportDetail.price.toFixed(2),
        total: reportDetail.total.toFixed(2),
        paymentMethod: reportDetail.paymentMethod,
      }));

    const cashierNames = `${reportOn}`
    const companyName = process.env.REACT_APP_COMPANY_SHORT_NAME
    let company = companyName /*+ " - " + localStorage.getItem("tp_name")*/ + newLine;
    let cashierDetail = "Report On: " + (cashierNames).substring(-company.length);
    let header = `${company} ${cashierDetail} ${newLine} Start Date: ${startDate} ${newLine} End Date: ${endDate}`;
    header += newLine + "Payment Method: " + paymentMethod.toUpperCase();

    const GRAND_TOTAL = `Total:${fourSpaceTab.repeat(4)}${response.report.grandTotal.toFixed(2)}${newLine}`;
    const DATE = `${this.dateFormatterService.format(new Date().toLocaleString('en-US', {timeZone: 'UTC'}))}${newLine}`;
    const RUN_BY = `Run By: ${localStorage.getItem('email')}`;

    let footer = `${newLine}
                        ${GRAND_TOTAL}
                        ${DATE}
                        ${RUN_BY}`;

    let content = convertReportDataToPrint(
      header,
      saleData,
      footer
    );

    const element = document!.getElementById("reports_to_print") as HTMLIFrameElement;
    const printWindow = element.contentWindow!;
    printWindow.document.open();
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();

  }

  checks(paying: number, grandTotal: number) {

    const storedTaxes = localStorage.getItem("taxes");
    let cartItems: any = localStorage.getItem("cart");

    if (typeof cartItems === 'string') {
      cartItems = JSON.parse(cartItems);
    }
    if (!storedTaxes) {
      toast.error("No stored taxes");
    }
    if (cartItems.length > 1 && paying === 0 && grandTotal === 0) {
      return this.salePrompt(paying, grandTotal, grandTotal - paying)
    }
    if (paying === null) {
      toast.error("How much is being paid?");
      return false;
    }
    if (!grandTotal) {
      toast.error("What is the total or how much is being paid?");
      return false;
    }
    if (grandTotal < 0) {
      toast.error("Your total is less than 0");
      return false;
    }
    if (paying < 0) {
      toast.error("You can't pay less than 0");
      return false;
    }
    if (paying < grandTotal) {
      toast.error("You can't pay less than the total! Paying: " + paying + " < Total: " + grandTotal);
      return false;
    }
    // if (grandTotal < 0) grandTotal = 0;

    const change = paying - grandTotal;

    return this.salePrompt(paying, grandTotal, change);
  }

  private salePrompt(paying: number, grandTotal: number, change: number) {
    return window.confirm(`Are you sure you want to make this sale:
                Paying  ₵:     ${this.currencyFormatterService.format(paying)}
                Total     ₵:     ${this.currencyFormatterService.format(grandTotal)}
                Change₵:     ${this.currencyFormatterService.format(change)}`);
  }
}
