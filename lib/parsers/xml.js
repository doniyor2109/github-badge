import xml from 'xml2js'

export async function xmlParser(res) {
  const text = await res.text();
  return new Promise((resolve, reject) => {
    xml.parseString(text, function(err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
