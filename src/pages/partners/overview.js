import React, { Component } from 'react'
import axios from 'axios'
import { globalHistory } from '@reach/router'
import Layout from '../../components/layout'
import SEO from '../../components/seo'
import Banner from '../../components/banner'
import imageBanner from '../../assets/images/partnerOverview.jpg'
import GetStarted from '../../components/getStarted'
import { Container, Row, Form, Col, Button, Image } from 'react-bootstrap'
import SideBySide from '../../components/sideBySide'
import GenCol from '../../components/genCol'
import FormGeneral from '../../components/formGen'
import sideThumb from '../../assets/images/sideThumb.jpg'
import SVGLoader from '../../components/loader'
import { validateForm } from '../../assets/js/custom-validation'
import Promise from 'promise'

const API_URL = process.env.GATSBY_API_URL
const CMS_API_URL = process.env.CMS_API_URL
const CMS_URL = process.env.CMS_URL

const urljoin = require('url-join')
const GATSBY_APP_URL = process.env.GATSBY_APP_URL
const page_url = urljoin(GATSBY_APP_URL, '/partner/partner-overview')

class App extends Component {
  componentDidMount() {
    const URL_PATH = globalHistory.location
    const url_segs = URL_PATH.pathname.split('/')
    const page_seg_one = url_segs[1]
    const page_seg_two = url_segs[2]
    var page_url_to_call
    if (typeof page_seg_two !== 'undefined' && page_seg_two.length >= 1) {
      page_url_to_call = '/' + page_seg_one + '/' + page_seg_two
    } else {
      page_url_to_call = '/' + page_seg_one
    }

    axios
      .get(CMS_API_URL + 'v1/pages/get_page_by_url?pageurl=' + page_url_to_call)
      .then(res => {
        const page_data = res.data[0]
        this.setState({ page_data })
        if (
          typeof page_data !== 'undefined' &&
          typeof page_data.body[0].processed !== 'undefined'
        ) {
          const page_body_content = page_data.body[0].processed.replace(
            /src="\//g,
            `src="${CMS_URL}/`
          )
          this.setState({ page_body_content })
          document.getElementsByClassName('partnersOverviewLoader')[0].remove()

          if (
            typeof page_data !== 'undefined' &&
            typeof page_data.field_two_columns_description[0].processed !==
              'undefined'
          ) {
            const field_two_columns_description_content = page_data.field_two_columns_description[0].processed.replace(
              /src="\//g,
              `src="${CMS_URL}/`
            )
            this.setState({ field_two_columns_description_content })
          }

          if (
            typeof page_data !== 'undefined' &&
            typeof page_data.field_two_columns_title_descript[0].processed !==
              'undefined'
          ) {
            const field_two_columns_title_descript_content = page_data.field_two_columns_title_descript[0].processed.replace(
              /src="\//g,
              `src="${CMS_URL}/`
            )
            this.setState({ field_two_columns_title_descript_content })
          }
        }
      })
      .catch(error => {
        // console.log(error.response)
      })
  }

  constructor(props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      emailaddress: '',
      companyName: '',
      websiteURL: '',
      areaOfInterest: '',
      primaryFocus: '',
      partnerObjectives: '',
      message: '',
      mailSent: false,
      error: null,
      isValidated: false,
      page_data: {
        metatag: { value: { title: null, description: null, abstract: null } },
        field_banner: [{ url: null }],
        field_banner_title: [{ value: null }],
        title: [{ value: null }],
        body: [
          {
            value: null,
            format: null,
            processed: null,
            summary: null,
            summary_processed: null,
          },
        ],
        field_two_columns_description: [
          {
            value: null,
            format: null,
            processed: null,
            summary: null,
            summary_processed: null,
          },
        ],
        field_two_columns_title_descript: [
          {
            value: null,
            format: null,
            processed: null,
            summary: null,
            summary_processed: null,
          },
        ],
        page_body_content: null,
        field_two_columns_description_content: null,
        field_two_columns_title_descript_content: null,
      },
    }
  }

  handleFormSubmit(event) {
    event.preventDefault()

    //Reset State
    this.setState({ error: null, mailSent: false })

    const formEl = this.formEl

    //If form validate
    if (validateForm(formEl)) {
      let data = this.state

      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: API_URL + '/contactus/BecomePartner',
          headers: { 'content-type': 'application/json' },
          data: data,
        })
          .then(result => {
            console.log(result)
            if (result.data.message) {
              this.setState({
                firstName: '',
                lastName: '',
                phoneNumber: '',
                emailaddress: '',
                companyName: '',
                websiteURL: '',
                areaOfInterest: '',
                primaryFocus: '',
                partnerObjectives: '',
                message: '',
                mailSent: true,
                isValidated: false,
              })
            } else {
              this.setState({ error: result.data.error })
            }
          })
          .catch(error => this.setState({ error: error.message }))
      })
    } else {
      this.setState({ isValidated: true })
      return false
    }
  }
  render() {
    if (typeof window !== 'undefined') {
      const setActive = (el, active) => {
        const formField = el.parentNode.parentNode
        if (active) {
          formField.classList.add('form-field--is-active')
        } else {
          formField.classList.remove('form-field--is-active')
          el.value === ''
            ? formField.classList.remove('form-field--is-filled')
            : formField.classList.add('form-field--is-filled')
        }
      }

      ;[].forEach.call(document.querySelectorAll('.inputMod'), el => {
        el.onblur = () => {
          setActive(el, false)
        }
        el.onfocus = () => {
          setActive(el, true)
        }
      })
    }
    let classNames = []
    if (this.state.isValidated) {
      classNames.push('was-validated')
    }
    return (
      <>
        <Layout>
          <SEO
            url={page_url}
            title={this.state.page_data.metatag.value.title}
            image={this.state.page_data.field_banner[0].url}
            description={this.state.page_data.metatag.value.description}
          />
          <main>
            <Banner
              title={this.state.page_data.field_banner_title[0].value}
              fluid="true"
              image={this.state.page_data.field_banner[0].url}
            />
            <div className="patner-overview">
              <SVGLoader loaderClass="partnersOverviewLoader" />
              <div className="simpleContent p_p">
                <div
                  className="field_two_columns_description bg-none first-para-box"
                  dangerouslySetInnerHTML={{
                    __html: this.state.page_body_content,
                  }}
                />
              </div>
              <div className="simpleContent">
                <div
                  className="field_two_columns_description"
                  dangerouslySetInnerHTML={{
                    __html: this.state.field_two_columns_title_descript_content,
                  }}
                />

                <div className="container">
                  <div className="sideBySide_Z p-o">
                    <div
                      className="field_two_columns_description bg-none"
                      dangerouslySetInnerHTML={{
                        __html: this.state
                          .field_two_columns_description_content,
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="simpleContent ta_center secPad">
                <div className="container">
                  <div className="small-container">
                    <div className="content">
                      <h2>Become our partner</h2>
                      <p>
                        Fill out the form here and we???ll follow up soon with
                        more information about our partner program
                      </p>
                    </div>
                    <div className="formHolder text-left">
                      <Form
                        method="post"
                        action="#"
                        ref={form => (this.formEl = form)}
                        className={classNames}
                        noValidate
                      >
                        {this.state.mailSent && (
                          <div className="alert-success alert text-center mb-5">
                            Thank you for contacting us.
                          </div>
                        )}
                        {this.state.error && (
                          <div className="alert-danger error alert text-center  mb-5">
                            {this.state.error}
                          </div>
                        )}
                        <Row>
                          <Col xs="12" sm="6">
                            <Form.Group controlId="firstName">
                              <Form.Control
                                className="inputMod"
                                type="text"
                                required={true}
                                value={this.state.firstName}
                                onChange={e =>
                                  this.setState({ firstName: e.target.value })
                                }
                              />
                              <Form.Label>First Name</Form.Label>
                              <div className="invalid-feedback" />
                            </Form.Group>
                          </Col>
                          <Col xs="12" sm="6">
                            <Form.Group controlId="lastName">
                              <Form.Control
                                className="inputMod"
                                type="text"
                                required={true}
                                value={this.state.lastName}
                                onChange={e =>
                                  this.setState({ lastName: e.target.value })
                                }
                              />
                              <Form.Label>Last Name</Form.Label>
                              <div className="invalid-feedback" />
                            </Form.Group>
                          </Col>
                          <Col xs="12" sm="6">
                            <Form.Group controlId="phoneNumber">
                              <Form.Control
                                className="inputMod"
                                type="text"
                                required={true}
                                value={this.state.phoneNumber}
                                onChange={e =>
                                  this.setState({ phoneNumber: e.target.value })
                                }
                              />
                              <Form.Label>Phone Number</Form.Label>
                              <div className="invalid-feedback" />
                            </Form.Group>
                          </Col>
                          <Col xs="12" sm="6">
                            <Form.Group controlId="emailAddress">
                              <Form.Control
                                className="inputMod"
                                type="text"
                                required={true}
                                value={this.state.emailaddress}
                                onChange={e =>
                                  this.setState({
                                    emailaddress: e.target.value,
                                  })
                                }
                              />
                              <Form.Label>Email Address</Form.Label>
                              <div className="invalid-feedback" />
                            </Form.Group>
                          </Col>
                          <Col xs="12" sm="6">
                            <Form.Group controlId="companyName">
                              <Form.Control
                                className="inputMod"
                                type="text"
                                required={true}
                                value={this.state.companyName}
                                onChange={e =>
                                  this.setState({ companyName: e.target.value })
                                }
                              />
                              <Form.Label>Company Name</Form.Label>
                              <div className="invalid-feedback" />
                            </Form.Group>
                          </Col>
                          <Col xs="12" sm="6">
                            <Form.Group controlId="ebsiteUrl">
                              <Form.Control
                                className="inputMod"
                                type="text"
                                required={true}
                                value={this.state.websiteURL}
                                onChange={e =>
                                  this.setState({ websiteURL: e.target.value })
                                }
                              />
                              <Form.Label>Website URL</Form.Label>
                              <div className="invalid-feedback" />
                            </Form.Group>
                          </Col>
                          <Col xs="12" sm="6" className="d-none">
                            <Form.Group controlId="phoneNumber_1">
                              <Form.Control
                                className="inputMod"
                                type="text"
                                required={true}
                                value={this.state.phoneNumber}
                                onChange={e =>
                                  this.setState({ phoneNumber: e.target.value })
                                }
                              />
                              <Form.Label>Phone Number</Form.Label>
                              <div className="invalid-feedback" />
                            </Form.Group>
                          </Col>
                          {/* <Col xs="12" sm="6">
                                                            <Form.Group controlId="objective">
                                                                <Form.Control className="inputMod" type="text"  required={true} value={this.state.partnerObjectives} onChange={e => this.setState({ partnerObjectives: e.target.value })}/>
                                                                <Form.Label>Partner Objectives</Form.Label>
                                                        <div className="invalid-feedback" />
                                                            </Form.Group>
                                                    </Col> */}
                        </Row>
                        <Form.Group controlId="additionalInfo">
                          <Form.Control
                            className="inputMod"
                            as="textarea"
                            rows="5"
                            required={true}
                            value={this.state.message}
                            onChange={e =>
                              this.setState({ message: e.target.value })
                            }
                          />
                          <Form.Label>Additional Information</Form.Label>
                          <div className="invalid-feedback" />
                        </Form.Group>

                        <Button
                          variant="primary"
                          className="btn-redBorder"
                          type="submit"
                          onClick={e => this.handleFormSubmit(e)}
                        >
                          Submit
                        </Button>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
              <GetStarted />
            </div>
          </main>
        </Layout>
      </>
    )
  }
}

export default App
