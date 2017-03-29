var React = require('react');

var LayoutContainer = require('./layout.jsx').LayoutContainer;

class AboutContainer extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <LayoutContainer>
        <WebsiteInfo />
        <MITLicense />
        <TermsOfUse />
      </LayoutContainer>
    )
  }
}

class WebsiteInfo extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
        <h4>Acknowledgements:</h4>
        <p>Without the following, this project would not be possible.</p>
        <ul>
          <li>
            <a href="https://developer.marvel.com">Marvel's API</a>
          </li>
          <li>
            <a href="http://glyphicons.com/">Glyphicons</a>
          </li>
          <li>
            <a href="http://fontawesome.io/">Font Awesome</a>
          </li>
        </ul>
      </div>
    )
  }
}

class MITLicense extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
        <h4>MIT License</h4>
        <p>
          Copyright (c) 2017 Nathan Starwalt
        </p>

        <p>
          Permission is hereby granted, free of charge, to any person obtaining a copy
          of this software and associated documentation files (the "Software"), to deal
          in the Software without restriction, including without limitation the rights
          to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
          copies of the Software, and to permit persons to whom the Software is
          furnished to do so, subject to the following conditions:
        </p>

        <p>
          The above copyright notice and this permission notice shall be included in all
          copies or substantial portions of the Software.
        </p>

        <p>
          THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
          IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
          FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
          AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
          LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
          OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
          SOFTWARE.
        </p>
      </div>
    )
  }
}

class TermsOfUse extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
        <h4>
          Terms of Use ("Terms")
        </h4>
        <h5>
          Last updated: March 29, 2017
        </h5>

        <p>
          Please read these Terms of Use ("Terms", "Terms of Use") carefully before using the
          "http://www.https://lycanthrope444.github.io/TIY-final-project/"
          application (the "Service") operated by My Company (change this) ("us", "we", or "our").
          Your access to and use of the Service is conditioned on your acceptance of and compliance with
          these Terms. These Terms apply to all visitors, users and others who access or use the Service.
          By accessing or using the Service you agree to be bound by these Terms. If you disagree
          with any part of the terms then you may not access the Service.
        </p>

        <h5>
          Termination
        </h5>
        <p>
          We may terminate or suspend access to our Service immediately, without prior notice or liability, for
          any reason whatsoever, including without limitation if you breach the Terms.
          All provisions of the Terms which by their nature should survive termination shall survive
          termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and
          limitations of liability.
        </p>

        <h5>
          Content
        </h5>
        <p>
          Our Service allows you to post, link, store, share and otherwise make available certain information,
          text, graphics, videos, or other material ("Content"). You are responsible for the content that you upload.
        </p>

        <h5>
          Links To Other Web Sites
        </h5>
        <p>
          Our Service may contain links to third-party web sites or services that are not owned or controlled
          by me.
          I have no control over, and assumes no responsibility for, the content,
          privacy policies, or practices of any third party web sites or services. You further acknowledge and
          agree that I shall not be responsible or liable, directly or indirectly, for any
          damage or loss caused or alleged to be caused by or in connection with use of or reliance on any
          such content, goods or services available on or through any such web sites or services.
        </p>

        <h5>
          Changes
        </h5>

        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a
          revision is material we will try to provide at least 30 days' notice prior to any new terms
          taking effect. What constitutes a material change will be determined at our sole discretion.
        </p>
        <h5>
          Contact Us
        </h5>
        <p>
          If you have any questions about these Terms, please contact us.
        </p>
      </div>
    )
  }
}


module.exports={AboutContainer};
