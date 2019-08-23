import React from 'react';
import ReactDOM from 'react-dom'
import { Page, Text, View, Document, StyleSheet, PDFViewer, ReactPDF, PDFDownloadLink } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});
{/* <PDFViewer style={{width: 950, height: 900}}></PDFViewer>  */}
// Create Document Component
const MyDoc = (props) => (
  <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text>111</Text>
            </View>
        </Page>
    </Document>
);

const App = () => (
  <div>
    <PDFDownloadLink document={<MyDoc />} fileName="somename.pdf">
      {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
    </PDFDownloadLink>
  </div>
)

ReactDOM.render(<App />, document.getElementById('root'));

