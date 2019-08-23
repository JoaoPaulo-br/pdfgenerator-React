import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';

let displayItem = []

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    margin: 10,
    padding: 10
  },
  section: {
   
    fontSize: 12,
    
  },
  section1: {
    
    fontSize: 54,
    
  },
  section2: {
   
    fontSize: 42,
    
  },
  section3: {
    
    fontSize: 36
  },
  section4: {
    
    fontSize: 30
  },
  section5: {
    
    fontSize: 24
  },
  section6: {
   
    fontSize: 12
  }

});

// Create Document Component

const MyDoc = (props1) => {
  let listitems;
  
  let bufContent = props1.detected === 0 ? JSON.parse(props1.content) : props1.content;
  let count = 0;
  if(props1.detected === 0) {
    let buf1 = JSON.parse(bufContent);
    listitems = buf1['blocks'].map((item) => {
        if(item['type'] === 'unstyled') {
            return (
              <View style={ styles.section }>
                <Text>{item['text']}</Text>
              </View>
            )
        } else if(item['type'] === 'header-one') {
          return (
            <View style={ styles.section1 }>
              <Text>{item['text']}</Text>
            </View>
          )
        } else if(item['type'] === 'header-two') {
          return (
            <View style={ styles.section2 }>
              <Text>{item['text']}</Text>
            </View>
          )
        } else if(item['type'] === 'header-three') {
          return (
            <View style={ styles.section3 }>
              <Text>{item['text']}</Text>
            </View>
          )
        } else if(item['type'] === 'header-four') {
          return (
            <View style={ styles.section4 }>
              <Text>{item['text']}</Text>
            </View>
          )
        } else if(item['type'] === 'header-five') {
          return (
            <View style={ styles.section5 }>
              <Text>{item['text']}</Text>
            </View>
          )
        } else if(item['type'] === 'header-six') {
          return (
            <View style={ styles.section6 }>
              <Text>{item['text']}</Text>
            </View>
          )
        } else if(item['type'] === 'ordered-list-item') {
          count++;
          return (
            <View style={ styles.section }>
              <Text>{`${count}.${item['text']}`}</Text>
            </View>
          )
        }
      }
    )
  } else {
    listitems = 
        <View style={styles.section}>
          <Text>
            {props1.content}
          </Text>
        </View>
  }
  return (
    <Document>
        <Page size="A4" style={styles.page}>
            {
              listitems
           }
        </Page>
    </Document>
  )
}

const Pdfrender = (props) => {
  
  return (
    <div>
      {props.isDown ? (
        <PDFDownloadLink document={<MyDoc content={props.content} detected={props.detected} />} fileName="result.pdf">
        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Yes')}
      </PDFDownloadLink>
      ) : (
        <PDFViewer style={{width: 950, height: 900}}>
          <MyDoc content={props.content} detected={props.detected} />
        </PDFViewer>
      )}
    </div>
  )
};

export default Pdfrender;

