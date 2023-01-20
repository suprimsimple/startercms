/**
 * Datatable
 * 
 * Extends plugin https://datatables.net/
 */

 import "datatables.net"
 import "datatables.net-responsive"
 import "datatables.net-fixedheader"
 
 const datatable = () => {
     // REAL TEST
     const initTest = () => {
         const tableTest = $("#datatable_test").DataTable({
             responsive: true,
             paging: false,
             ordering: false, // TODO: RESOLVE -- Output gets botched when ordering is on
             info: false,
         });
 
         new $.fn.dataTable.FixedHeader(tableTest);
 
         // ----------
         // Filters
         // ----------
 
         // Project Name
         $.fn.dataTable.ext.search.push(
             (settings, data, dataIndex) => {
                 const searchProjectName = $("#test_filter_project_name").val();
                 const dataProjectName = data[0] || "";
                 return dataProjectName.toLowerCase().includes(searchProjectName.toLowerCase());
             }
         );
         $("#test_filter_project_name").on("keyup", () => {
             tableTest.draw();
         });
 
         // Locality
         $.fn.dataTable.ext.search.push(
             (settings, data, dataIndex) => {
                 const searchLocality = $("#test_filter_locality").val();
                 const $cell = $(tableTest.column(1).nodes()[dataIndex]);
                 const cellLocality = $cell.attr("data-table-locality").split(",");
                 const matched = searchLocality == "" || cellLocality.includes(searchLocality);
                 console.log({ searchLocality, cellLocality, matched, $cell });
                 return matched;
             }
         );
         $("#test_filter_locality").on("change", function() {
             console.log("\n\n>>change<< LOCALITY");
             tableTest.draw();
         });
 
         // Status
         $.fn.dataTable.ext.search.push(
             (settings, data, dataIndex) => {
                 const searchStatus = $("#test_filter_status").val();
                 const $cell = $(tableTest.column(3).nodes()[dataIndex]);
                 const cellStatus = $cell.attr("data-table-status");
                 const matched = (searchStatus == "" || searchStatus == cellStatus) && !(cellStatus == "archived" && searchStatus != "archived");
                 console.log({ searchStatus, cellStatus, matched, $cell });
                 return matched;
             }
         );
         $("#test_filter_status").on("change", function() {
             console.log("\n\n>>change<< STATUS");
             tableTest.draw();
         });
 
         // Consultation
         $.fn.dataTable.ext.search.push(
             (settings, data, dataIndex) => {
                 const searchConsultation = $("#test_filter_consultation").val();
                 const $cell = $(tableTest.column(5).nodes()[dataIndex]);
                 const cellConsultation = $cell.attr("data-table-consultation");
                 const matched = searchConsultation == "" || searchConsultation == cellConsultation;
                 console.log({ searchConsultation, cellConsultation, matched, $cell });
                 return matched;
             }
         );
         $("#test_filter_consultation").on("change", function() {
             console.log("\n\n>>change<< CONSULTATION");
             tableTest.draw();
         });

        //  setTimeout(() => {
        //     tableTest.draw();
        //  }, 100);
         tableTest.draw();
     }
 
     const init = () => {
         initTest();

         // Initialised
         console.log("datatables >>> Initialised!");
     }
 
     init();
 }
 
 // TODO: REVIEW -- own module?
 const extraDataToggle = () => {
     $(".extra-data-toggle").on("click", function() {
         $(this).toggleClass("show");
     })
 }
 
 $(datatable);
 $(extraDataToggle);
 
 export default datatable;
 