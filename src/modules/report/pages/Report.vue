/* eslint-disable new-cap */
<template>
  <q-page>
    <div class="q-pa-md">
      <q-item-label header>Sales Report</q-item-label>
      <!-- {{salesList}}
      <q-separator inset />
      {{testSalesList}} -->
      <q-separator inset />
      <q-btn
        label="Generate Report "
        class="q-ma-md"
        @click="generateSalesReport()"
      />
      <div
        v-for="(sales,index) in salesList"
        :key="index"
        class="column full-width"
      >
        <div
          class="row border"
          v-for="(sale,index) in sales.data"
          :key="index"
        >
          <!-- {{sale}} -->
          <div class="column border col-2">sales id: {{sale.id}}</div>
          <div class="col">
            <div
              class="col column test"
              v-for="(product,index) in sale.products"
              :key="index"
            >
              <div class="col border">
                <p>product id: {{product.prodId}}</p>
                <p>product name: {{product.prodName}}</p>
                <p>product price: {{product.prodPrice}}</p>
                <p>product Quantity: {{product.prodQuantity}}</p>
              </div>
            </div>
          </div>
          <div class="col-2 column">

            <div class="border col">Employee id : {{sale.empId}}</div>
            <div class="border col">{{sale.comment}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- pdf table -->
    <table
      ref="salesTable"
      style="display: none;"
    >
      <thead>
        <tr>
          <th>SALES ID</th>
          <th>PRODCUT ID</th>
          <th>PRODUCT NAME</th>
          <th>PRICE</th>
          <th>QUANTITY</th>
          <th>EMPLOYEE ID</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(sales,index) in SalesListTableData"
          :key="index"
        >
          <td align="right">{{sales.id}}</td>
          <td>{{sales.prodId}}</td>
          <td>{{sales.prodName}}</td>
          <td>{{sales.prodPrice}}</td>
          <td>{{sales.prodQuantity}}</td>
          <td>{{sales.empId}}</td>
        </tr>
      </tbody>
    </table>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default {
  data() {
    return {};
  },
  created() {
    this.$store.dispatch('loadSalesList');
  },
  methods: {
    test() {
      this.$store.dispatch('loadSalesList').then((res) => {
        console.log(res);
      });
    },
    generateSalesReport() {
      // eslint-disable-next-line new-cap
      const doc = new jsPDF('p', 'pt', 'a4');
      const res = doc.autoTableHtmlToJson(this.$refs.salesTable);
      console.log(res);
      const header = (data) => {
        doc.setFontSize(18);
        doc.setTextColor(40);
        doc.setFontStyle('bold');
        // doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
        doc.text('Sales Report', data.settings.margin.left, 50);
        doc.setFontSize(8);
        doc.setTextColor(40);
        doc.setFontStyle('normal');
        doc.text(new Date().toString(), data.settings.margin.right, 10);
      };

      const options = {
        theme: 'grid',
        didDrawPage: header,
        margin: {
          top: 80,
        },
        headStyles: { fillColor: [2, 69, 176] },
        columnStyles: {
        },
        startY: doc.autoTableEndPosY() + 80,
      };


      console.log(doc.getFontList());
      let records = this.SalesListTableData.length;
      console.log(records);
      let pageNumber = 0;
      while (records > 0) {
        pageNumber += 1;
        doc.text(`page-${pageNumber}`, 500, 800);
        records -= 18;
      }
      doc.autoTable(res.columns, res.data, options);

      // doc.text(`page-${i}`, 500, 700);
      // doc.autoPrint();
      doc.save(`sals-report(${new Date()}).pdf`);
    },
  },
  computed: {
    ...mapState({

      salesList: state => state.sales.salesList,
    }),
    SalesListTableData() {
      const els = [];
      this.salesList.data.data.forEach((element) => {
        element.products.forEach((product) => {
          const el = {
            id: element.id,
            prodName: product.prodName,
            prodId: product.prodId,
            prodPrice: product.prodPrice,
            prodQuantity: product.prodQuantity,
            empId: element.empId,
          };
          els.push(el);
        });
      });
      console.log(els);
      return els;
      // return this.salesList.data.data;
    },
  },
};
</script>

<style>
.border {
  border: 1px solid black;
}
p {
  margin: 5px;
}
</style>
