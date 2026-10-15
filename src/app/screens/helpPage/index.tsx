import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Container, Stack, Tabs } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import React from "react";

import "../../../css/help.css";
import { faq } from "../../../lib/data/faq";
import { terms } from "../../../lib/data/terms";

export default function HelpPage() {
  const [value, setValue] = React.useState("1");

  const handleChange = (e: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="help-page">
      <Container className="help-container">
        <div className="help-header">
          <h1>How Can We Help You?</h1>
          <p>Find answers to your questions or get in touch with our Soully team.</p>
        </div>

        <TabContext value={value}>
          <Box className="help-menu">
            <Tabs value={value} onChange={handleChange} className="help-tabs">
              <Tab label="TERMS & CONDITIONS" value="1" />
              <Tab label="FAQ" value="2" />
              <Tab label="CONTACT US" value="3" />
            </Tabs>
          </Box>

          <Stack className="help-main-content">
            {/* TERMS */}

            <TabPanel value="1">
              <div className="rules-box">
                <div className="section-heading">
                  <h2>Terms & Conditions</h2>
                  <p>Please read our terms carefully before using Soully services.</p>
                </div>

                <div className="rules-frame">
                  {terms.map((item, index) => (
                    <div className="rule-item" key={index}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabPanel>

            {/* FAQ */}

            <TabPanel value="2">
              <div className="faq-box">
                <div className="section-heading">
                  <h2>Frequently Asked Questions</h2>
                  <p>Everything you need to know about our flowers, delivery and orders.</p>
                </div>

                <div className="accordion-menu">
                  {faq.map((item, index) => (
                    <Accordion key={index} className="faq-item">
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{item.question}</Typography>
                      </AccordionSummary>

                      <AccordionDetails>
                        <Typography>{item.answer}</Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </div>
              </div>
            </TabPanel>

            {/* CONTACT */}

            <TabPanel value="3">
              <div className="contact-box">
                <div className="contact-info">
                  <h2>Let's Talk About Flowers</h2>

                  <p>
                    Have a question about your order, delivery, or need help choosing the perfect
                    bouquet? We're always happy to help.
                  </p>

                  <div className="contact-details">
                    <div>
                      <strong>Email</strong>
                      <span>hello@soully.uz</span>
                    </div>

                    <div>
                      <strong>Phone</strong>
                      <span>+998 90 123 45 67</span>
                    </div>

                    <div>
                      <strong>Working Hours</strong>
                      <span>24/7 Support</span>
                    </div>
                  </div>
                </div>

                <form
                  className="contact-form"
                  onSubmit={(event) => {
                    event.preventDefault();
                    const data = new FormData(event.currentTarget);
                    const name = String(data.get("memberNick") || "").trim();
                    const email = String(data.get("memberEmail") || "").trim();
                    const message = String(data.get("memberMsg") || "").trim();
                    if (!name || !email || !message) return;
                    window.location.href = `mailto:hello@soully.uz?subject=${encodeURIComponent(`Soully enquiry from ${name}`)}&body=${encodeURIComponent(`${message}\n\nFrom: ${name}\nReply to: ${email}`)}`;
                  }}
                >
                  <div className="form-title">
                    <h3>Send us a message</h3>
                    <p>Open a draft in your email app to send your message.</p>
                  </div>

                  <div className="admin-input-box">
                    <label htmlFor="contact-name">Your Name</label>
                    <input
                      id="contact-name"
                      required
                      maxLength={100}
                      type="text"
                      name="memberNick"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="admin-input-box">
                    <label htmlFor="contact-email">Your Email</label>
                    <input
                      id="contact-email"
                      required
                      maxLength={200}
                      type="email"
                      name="memberEmail"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="admin-input-box">
                    <label htmlFor="contact-message">Your Message</label>
                    <textarea
                      id="contact-message"
                      required
                      maxLength={2000}
                      name="memberMsg"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <Button type="submit" variant="contained" className="send-button">
                    Open Email Draft →
                  </Button>
                </form>
              </div>
            </TabPanel>
          </Stack>
        </TabContext>
      </Container>
    </div>
  );
}
