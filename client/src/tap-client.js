/**
 * @fileoverview This module is designed to handle all tap query requests
 */

class TapClient {

  static query(queryString) {
    fetch(`http://127.0.0.1:5000/query/?${queryString}`)
      .then(response => response.text())
      
  }
}

export default TapClient