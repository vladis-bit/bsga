// Šablóna e-mailu o zrušení rezervácie BSGA Performance Center.
import { esc } from "./bookingEmail.ts";

const TEMPLATE = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="sk">
  <head>
    <meta content="width=device-width" name="viewport" />
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta content="IE=edge" http-equiv="X-UA-Compatible" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta content="telephone=no,address=no,email=no,date=no,url=no" name="format-detection" />
    <title>Vaša rezervácia bola zrušená – {{date}} o {{time}}</title>
    <style>
      @media (prefers-color-scheme: dark){li::marker{color:#c4c4c4}}
    </style>
    <style>
      @media only screen and (max-width: 620px) {
              .wrap { width: 100% !important; }
              .pad { padding-left: 22px !important; padding-right: 22px !important; }
              .h1 { font-size: 30px !important; line-height: 36px !important; }
            }
    </style>
  </head>
  <body
    dir="ltr"
    lang="en"
    style="background-color:#efe9de;margin:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0"
  >
    <!--$--><!--html--><!--head-->
    <div
      style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0"
      data-skip-in-text="true"
    >
      Vaša rezervácia bola zrušená – {{date}} o {{time}}
      <div>
         ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿
      </div>
    </div>
    <table border="0" width="100%" cellpadding="0" cellspacing="0" role="presentation" align="center">
      <tbody>
        <tr>
          <td
            dir="ltr"
            lang="en"
            style="background-color:#efe9de;margin:0px;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px"
          >
            <table
              align="left"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="max-width:600px;align:left;width:100%;background-color:#f7f5f0;border-radius:0px"
            >
              <tbody>
                <tr style="width:100%">
                  <td style="padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px">
                    <p style="margin:0;padding:0">
                      <span style="color:#efe9de"
                        ><span
                          style="display:none;font-size:1px;color:#efe9de;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden"
                          >Vaša rezervácia v BSGA Performance Center bola zrušená. Termín a kontaktné údaje nájdete
                          v tomto e-maile.</span
                        ></span
                      >
                    </p>
                    <table
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0;background-color:#efe9de"
                    >
                      <tbody>
                        <tr style="margin:0;padding:0">
                          <td align="center" data-id="__react-email-column" style="margin:0;padding:32px 12px">
                            <table
                              width="600"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              class="wrap"
                              style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0;width:600px;max-width:600px"
                            >
                              <tbody>
                                <tr style="margin:0;padding:0">
                                  <td
                                    class="pad"
                                    align="center"
                                    data-id="__react-email-column"
                                    style="margin:0;padding:34px 40px 30px 40px;background-color:#f7f5f0;border-radius:24px"
                                  >
                                    <div
                                      style="margin:0;padding:0;font-family:Arial, Helvetica, sans-serif;font-size:11px;line-height:16px;mso-line-height-rule:exactly;letter-spacing:3px;text-transform:uppercase;color:#a8874f;font-weight:bold;padding-top:18px"
                                    >
                                      <img
                                        alt="Best Swing Golf Academy"
                                        height="94"
                                        src="https://bsga.sk/assets/emails/bsga-logo-trim.png"
                                        style="display:block;outline:none;border:0;text-decoration:none;height:94px;width:96px;margin:0 auto"
                                        width="96"
                                      />
                                      <p style="margin:0;padding:0">BSGA Performance Center</p>
                                    </div>
                                  </td>
                                </tr>
                                <tr style="margin:0;padding:0">
                                  <td
                                    data-id="__react-email-column"
                                    style="margin:0;padding:0;font-size:0;line-height:0;height:14px"
                                  >
                                    <p style="margin:0;padding:0"> </p>
                                  </td>
                                </tr>
                                <tr style="margin:0;padding:0">
                                  <td
                                    data-id="__react-email-column"
                                    style="margin:0;padding:0;background-color:#ffffff;border-radius:24px"
                                  >
                                    <table
                                      width="100%"
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      role="presentation"
                                      style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0;width:100%"
                                    >
                                      <tbody>
                                        <tr style="margin:0;padding:0">
                                          <td
                                            class="pad"
                                            align="center"
                                            data-id="__react-email-column"
                                            style="margin:0;padding:40px 40px 0 40px;font-family:Arial, Helvetica, sans-serif"
                                          >
                                            <table
                                              align="center"
                                              border="0"
                                              cellpadding="0"
                                              cellspacing="0"
                                              role="presentation"
                                              style="margin-top:0;margin-right:auto;margin-bottom:0;margin-left:auto;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0"
                                            >
                                              <tbody>
                                                <tr style="margin:0;padding:0">
                                                  <td
                                                    data-id="__react-email-column"
                                                    style="margin:0;padding:9px 18px;background-color:#f2ebdd;border-radius:100px;font-family:Arial, Helvetica, sans-serif;font-size:11px;line-height:14px;mso-line-height-rule:exactly;letter-spacing:2px;text-transform:uppercase;color:#8f6f38;font-weight:bold"
                                                  >
                                                    <p style="margin:0;padding:0">Stornovanie rezervácie</p>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                            <div
                                              class="h1"
                                              style="margin:0;padding:0;padding-top:22px;font-size:34px;line-height:42px;mso-line-height-rule:exactly;letter-spacing:-0.5px;color:#16150f;font-weight:bold"
                                            >
                                              <p style="margin:0;padding:0">Rezervácia bola zrušená</p>
                                            </div>
                                            <div
                                              style="margin:0;padding:0;padding-top:16px;font-size:16px;line-height:26px;mso-line-height-rule:exactly;color:#4a463c"
                                            >
                                              <p style="margin:0;padding:0">
                                                Dobrý deň <strong>{{{first_name}}}</strong><strong> </strong
                                                ><strong>{{{last_name}}}</strong>,<br />Vaša rezervácia do BSGA
                                                Performance Center bola úspešne zrušená.
                                              </p>
                                            </div>
                                          </td>
                                        </tr>
                                        <tr style="margin:0;padding:0">
                                          <td
                                            class="pad"
                                            data-id="__react-email-column"
                                            style="margin:0;padding:30px 40px 0 40px"
                                          >
                                            <table
                                              width="100%"
                                              border="0"
                                              cellpadding="0"
                                              cellspacing="0"
                                              role="presentation"
                                              style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0;width:100%;background-color:#f7f5f0;border-radius:20px"
                                            >
                                              <tbody>
                                                <tr style="margin:0;padding:0">
                                                  <td
                                                    align="center"
                                                    data-id="__react-email-column"
                                                    style="margin:0;padding:26px 24px 22px 24px;font-family:Arial, Helvetica, sans-serif"
                                                  >
                                                    <div
                                                      style="margin:0;padding:0;font-size:11px;line-height:14px;mso-line-height-rule:exactly;letter-spacing:2px;text-transform:uppercase;color:#a8874f;font-weight:bold"
                                                    >
                                                      <p style="margin:0;padding:0">Zrušený termín</p>
                                                    </div>
                                                    <div
                                                      style="margin:0;padding:0;padding-top:12px;font-size:22px;line-height:30px;mso-line-height-rule:exactly;color:#16150f;font-weight:bold"
                                                    >
                                                      <p style="margin:0;padding:0">{{{date}}}</p>
                                                    </div>
                                                    <div
                                                      style="margin:0;padding:0;padding-top:4px;font-size:18px;line-height:26px;mso-line-height-rule:exactly;color:#4a463c"
                                                    >
                                                      <p style="margin:0;padding:0">{{{time}}}</p>
                                                    </div>
                                                    <div
                                                      style="margin:0;padding:0;padding-top:4px;font-size:18px;line-height:26px;mso-line-height-rule:exactly;color:#4a463c"
                                                    >
                                                      <p style="margin:0;padding:0">{{{simulator}}}</p>
                                                    </div>
                                                    <div
                                                      style="margin:0;padding:0;padding-top:4px;font-size:18px;line-height:26px;mso-line-height-rule:exactly;color:#4a463c"
                                                    >
                                                      <p style="margin:0;padding:0">{{{duration}}}</p>
                                                    </div>
                                                  </td>
                                                </tr>
                                                <tr style="margin:0;padding:0">
                                                  <td
                                                    align="center"
                                                    data-id="__react-email-column"
                                                    style="margin:0;padding:0 24px"
                                                  >
                                                    <table
                                                      width="100%"
                                                      border="0"
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      role="presentation"
                                                      style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0;width:100%"
                                                    >
                                                      <tbody>
                                                        <tr style="margin:0;padding:0">
                                                          <td
                                                            data-id="__react-email-column"
                                                            style="margin:0;padding:0;border-top:1px solid #e3dbc9;font-size:0;line-height:0;height:1px"
                                                          >
                                                            <p style="margin:0;padding:0"> </p>
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                                <tr style="margin:0;padding:0">
                                                  <td
                                                    align="center"
                                                    data-id="__react-email-column"
                                                    style="margin:0;padding:22px 24px 26px 24px;font-family:Arial, Helvetica, sans-serif"
                                                  >
                                                    <div
                                                      style="margin:0;padding:0;font-size:11px;line-height:14px;mso-line-height-rule:exactly;letter-spacing:2px;text-transform:uppercase;color:#a8874f;font-weight:bold"
                                                    >
                                                      <p style="margin:0;padding:0">Kontaktné údaje pri rezervácii</p>
                                                    </div>
                                                    <div
                                                      style="margin:0;padding:0;padding-top:12px;font-size:16px;line-height:26px;mso-line-height-rule:exactly;color:#16150f"
                                                    >
                                                      <p style="margin:0;padding:0">{{{email}}}{{{phone_line}}}</p>
                                                    </div>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                        <tr style="margin:0;padding:0">
                                          <td
                                            class="pad"
                                            align="center"
                                            data-id="__react-email-column"
                                            style="margin:0;padding:28px 40px 0 40px"
                                          >
                                            <table
                                              align="center"
                                              border="0"
                                              cellpadding="0"
                                              cellspacing="0"
                                              role="presentation"
                                              style="margin-top:0;margin-right:auto;margin-bottom:0;margin-left:auto;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0"
                                            >
                                              <tbody>
                                                <tr style="margin:0;padding:0">
                                                  <td
                                                    align="center"
                                                    data-id="__react-email-column"
                                                    style="margin:0;padding:0;background-color:#a8874f;border-radius:100px"
                                                  >
                                                    <p style="margin:0;padding:0">
                                                      <a
                                                        href="https://bsga.sk/performance-center/rezervacia"
                                                        rel="noopener noreferrer nofollow"
                                                        style="color:#ffffff;text-decoration-line:none;text-decoration:none;display:block;padding:16px 34px;font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:18px;mso-line-height-rule:exactly;letter-spacing:0.6px;font-weight:bold"
                                                        target="_blank"
                                                        >Nová rezervácia</a
                                                      >
                                                    </p>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                            
                                          </td>
                                        </tr>
                                        <tr style="margin:0;padding:0">
                                          <td
                                            class="pad"
                                            align="center"
                                            data-id="__react-email-column"
                                            style="margin:0;padding:26px 40px 38px 40px;font-family:Arial, Helvetica, sans-serif;font-size:16px;line-height:26px;mso-line-height-rule:exactly;color:#4a463c"
                                          >
                                            <p style="margin:0;padding:0">
                                              Veríme, že si čoskoro dohodnete nový termín.<br /><span
                                                style="color:#a8874f"
                                                ><span style="color:#a8874f;font-weight:bold">Tím BSGA</span></span
                                              >
                                            </p>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr style="margin:0;padding:0">
                                  <td
                                    data-id="__react-email-column"
                                    style="margin:0;padding:0;font-size:0;line-height:0;height:14px"
                                  >
                                    <p style="margin:0;padding:0"> </p>
                                  </td>
                                </tr>
                                <tr style="margin:0;padding:0">
                                  <td
                                    class="pad"
                                    align="center"
                                    data-id="__react-email-column"
                                    style="margin:0;padding:30px 40px;background-color:#f2ebdd;border-radius:24px;font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:24px;mso-line-height-rule:exactly;color:#4a463c"
                                  >
                                    <div
                                      style="margin:0;padding:0;font-size:11px;line-height:14px;mso-line-height-rule:exactly;letter-spacing:2px;text-transform:uppercase;color:#8f6f38;font-weight:bold;padding-bottom:12px"
                                    >
                                      <p style="margin:0;padding:0">Máte otázky?</p>
                                    </div>
                                    <p style="margin:0;padding:0">
                                      Ak ste rezerváciu zrušili omylom, alebo si potrebujete dohodnúť nový termín, radi Vám
                                      pomôžeme telefonicky či e-mailom. Prípadne si nový termín jednoducho vytvoríte
                                      priamo cez tlačidlo vyššie.
                                    </p>
                                  </td>
                                </tr>
                                <tr style="margin:0;padding:0">
                                  <td
                                    data-id="__react-email-column"
                                    style="margin:0;padding:0;font-size:0;line-height:0;height:14px"
                                  >
                                    <p style="margin:0;padding:0"> </p>
                                  </td>
                                </tr>
                                <tr style="margin:0;padding:0">
                                  <td
                                    class="pad"
                                    align="center"
                                    data-id="__react-email-column"
                                    style="margin:0;padding:28px 40px;background-color:#ffffff;border-radius:24px;font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:23px;mso-line-height-rule:exactly;color:#4a463c"
                                  >
                                    <p style="margin:0;padding:0">
                                      <strong>BSGA Performance Center</strong><br />Zuzany Chalupovej 12, 85107
                                      Bratislava<br />Slovenská republika<br /><a
                                        href="mailto:info@bsga.sk"
                                        rel="noopener noreferrer nofollow"
                                        style="color:#8f6f38;text-decoration-line:none;text-decoration:underline"
                                        target="_blank"
                                        ><u>info@bsga.sk</u></a
                                      >, +421 905 335 501
                                    </p>
                                  </td>
                                </tr>
                                <tr style="margin:0;padding:0">
                                  <td
                                    data-id="__react-email-column"
                                    style="margin:0;padding:0;font-size:0;line-height:0;height:14px"
                                  >
                                    <p style="margin:0;padding:0"> </p>
                                  </td>
                                </tr>
                                <tr style="margin:0;padding:0">
                                  <td
                                    data-id="__react-email-column"
                                    style="margin:0;padding:0;background-color:#ffffff;border-radius:24px"
                                  >
                                    <table
                                      width="100%"
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      role="presentation"
                                      style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0;width:100%"
                                    >
                                      <tbody>
                                        <tr style="margin:0;padding:0">
                                          <td
                                            class="pad"
                                            align="center"
                                            data-id="__react-email-column"
                                            style="margin:0;padding:28px 40px 18px 40px;font-family:Arial, Helvetica, sans-serif"
                                          >
                                            <div
                                              style="margin:0;padding:0;font-size:11px;line-height:14px;mso-line-height-rule:exactly;letter-spacing:2px;text-transform:uppercase;color:#a8874f;font-weight:bold"
                                            >
                                              <p style="margin:0;padding:0">Kde nás najdete</p>
                                            </div>
                                            <div
                                              style="margin:0;padding:0;padding-top:10px;font-size:16px;line-height:24px;mso-line-height-rule:exactly;color:#16150f;font-weight:bold"
                                            >
                                              <p style="margin:0;padding:0">Zuzany Chalupovej 12, Bratislava</p>
                                            </div>
                                          </td>
                                        </tr>
                                        <tr style="margin:0;padding:0">
                                          <td
                                            align="center"
                                            data-id="__react-email-column"
                                            style="margin:0;padding:0 20px"
                                          >
                                            <a
                                              href="https://www.google.com/maps/search/?api=1&amp;query=Zuzany+Chalupovej+12%2C+851+07+Bratislava"
                                              style="color:#067df7;text-decoration-line:none"
                                              target="_blank"
                                              ><img
                                                alt="Mapa — Zuzany Chalupovej 12, Bratislava"
                                                src="https://bsga.sk/assets/emails/map-clean.png"
                                                style="display:block;outline:none;border:0;text-decoration:none;max-width:560px;height:auto;width:100%;border-radius:20px"
                                                width="560"
                                            /></a>
                                          </td>
                                        </tr>
                                        <tr style="margin:0;padding:0">
                                          <td
                                            data-id="__react-email-column"
                                            style="margin:0;padding:0;font-size:0;line-height:0;height:24px"
                                          >
                                            <p style="margin:0;padding:0"> </p>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr style="margin:0;padding:0">
                                  <td
                                    class="pad"
                                    align="center"
                                    data-id="__react-email-column"
                                    style="margin:0;padding:18px 40px 0 40px;font-family:Arial, Helvetica, sans-serif;font-size:11px;line-height:18px;mso-line-height-rule:exactly;letter-spacing:0.5px;color:#8b8578"
                                  >
                                    <p style="margin:0;padding:0">
                                      Tento e-mail ste dostali ako potvrdenie stornovania rezervácie v BSGA Performance Center,
                                      Zuzany Chalupovej 12, 85107 Bratislava.
                                    </p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <!--/$-->
  </body>
</html>`;

export type CancellationEmailData = {
  firstName: string;
  lastName?: string | null;
  date: string;
  time: string;
  email: string;
  phone?: string | null;
  simulator: string;
  duration: string;
};

export const renderCancellationEmail = (d: CancellationEmailData) => {
  const phone = String(d.phone ?? "").trim();
  const vars: Record<string, string> = {
    first_name: esc(d.firstName),
    last_name: esc(d.lastName ?? ""),
    date: esc(d.date),
    time: esc(d.time),
    email: esc(d.email),
    phone_line: phone ? `<br />${esc(phone)}` : "",
    simulator: esc(d.simulator),
    duration: esc(d.duration),
  };
  return TEMPLATE.replace(/\{\{\{?(\w+)\}\}\}?/g, (_m, key: string) => vars[key] ?? "");
};
