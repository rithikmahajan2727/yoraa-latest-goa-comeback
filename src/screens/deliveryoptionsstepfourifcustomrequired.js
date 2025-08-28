import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { FontFamilies, FontSizes } from "../constants";

const { height: screenHeight } = Dimensions.get('window');
const DEVICE = { HEIGHT: screenHeight };
const FONT_FAMILY = {
  BOLD: FontFamilies.bold,
  MEDIUM: FontFamilies.medium,
};
const FONT_SIZE = {
  LARGE: FontSizes.xxl,
  S: FontSizes.md,
  XS: FontSizes.sm,
};

const CustomClearance = ({ navigation }) => {
  const DOCUMENT_OPTIONS = [
    {
      label: "Upload ID as Indian Resident",
      value: "indianResident",
      documentTypes: [
        { label: "Aadhar Card", value: 1 },
        { label: "Passport Number", value: 2 },
        { label: "Election/Voter ID Card", value: 3 },
      ],
      proofOfResidence: [
        { label: "Bank Account Statement", value: 1 },
        { label: "Electricity Bill", value: 2 },
        { label: "Employee ID or HR Declaration Letter", value: 3 },
        { label: "LPG Connection - LPG Monthly Payment Receipt", value: 4 },
        { label: "Water Bill", value: 5 },
        { label: "WiFi/Broadband Bill", value: 6 },
        { label: "Telephone Bill", value: 7 },
        { label: "Property Tax/Sales Deed", value: 8 },
        { label: "Property Maintenance Bill", value: 9 },
        { label: "Government Officers - Allotment Letter", value: 10 },
        { label: "Possession Letter", value: 11 },
        { label: "PG Rent Receipt - Duly Stamped", value: 12 },
      ],
    },
    {
      label: "Upload ID as Foreign National",
      value: "foreignNational",
      documentTypes: [{ label: "Passport Number", value: 1 }],
      proofOfResidence: [
        { label: "Bank Account Statement", value: 1 },
        { label: "Electricity Bill", value: 2 },
        { label: "Employee ID or HR Declaration Letter", value: 3 },
        { label: "LPG Connection - LPG Monthly Payment Receipt", value: 4 },
        { label: "Water Bill", value: 5 },
        { label: "WiFi/Broadband Bill", value: 6 },
        { label: "Telephone Bill", value: 7 },
        { label: "Property Tax/Sales Deed", value: 8 },
        { label: "Property Maintenance Bill", value: 9 },
        { label: "Government Officers - Allotment Letter", value: 10 },
        { label: "Possession Letter", value: 11 },
        { label: "PG Rent Receipt - Duly Stamped", value: 12 },
      ],
    },
    {
      label: "Skip for Now",
      value: "skip",
      documentTypes: [],
      proofOfResidence: [],
    },
  ];
  const AddressOptions = [
    {
      label: "Address on ID Matches Shipping Address",
      value: "Same",
    },
    {
      label: "Address on ID does not Matches Shipping Address",
      value: "Different",
    },
  ];
  const FOREIGN_PROOF_DOCUMENTS = [
    "Address proof of relative/friend if staying with them",
    "Hotel Booking Receipt",
    "Rent Agreement",
    "Stay Visa",
    "Other Document",
  ];

  const [docOption, setDocOption] = useState(DOCUMENT_OPTIONS[0]);
  const [docType, setDocType] = useState({
    label: "Select Document Type",
    value: null,
  });
  const [proofOfResidence, setProofOfResidence] = useState({
    label: "Select Document Type",
    value: null,
  });
  const [addressType, setAddressType] = useState(AddressOptions[0]);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [showDocTypeDropdown, setShowDocTypeDropdown] = useState(false);
  const [showProofDropdown, setShowProofDropdown] = useState(false);

  const toggleCheckbox1 = () => {
    setChecked1((prev) => !prev);
  };
  const toggleCheckbox2 = () => {
    setChecked2((prev) => !prev);
  };
  const toggleCheckbox3 = () => {
    setChecked3((prev) => !prev);
  };
  const toggleCheckbox4 = () => {
    setChecked4((prev) => !prev);
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: "15%",
        gap: 15,
        paddingHorizontal: 15,
      }}
    >
      {/* Back button */}
      <TouchableOpacity
        onPress={() => navigation?.goBack()}
        style={{ marginLeft: -10 }}
      >
        <Text style={{ fontSize: 24, color: 'black' }}>←</Text>
      </TouchableOpacity>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, gap: 10 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* HEADING */}
          <View style={{}}>
            <Text
              style={{
                fontFamily: FONT_FAMILY.BOLD,
                fontSize: FONT_SIZE.LARGE,
              }}
            >
              ID for Custom Clearance
            </Text>
          </View>
          {/* sub heading */}
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Text
              style={{
                fontFamily: FONT_FAMILY.BOLD,
                fontSize: FONT_SIZE.S,
                color: "gray",
              }}
            >
              Provide your National ID information to expedite the customs
              clearance process. If you don't provide this information at
              Checkout, you will be asked to provide it once your order has been
              processed. Please ensure the address on your KYC document matches
              your shipping address.
            </Text>
          </View>
          {/* Choice of ids */}
          <View style={{ gap: 10 }}>
            {DOCUMENT_OPTIONS.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setDocType({ label: "Select Document Type", value: null });
                  setDocOption(option);
                }}
                style={{
                  padding: 10,
                  borderWidth: 1,
                  borderColor:
                    docOption?.value === option.value ? "black" : "lightgray",
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{
                    fontFamily: FONT_FAMILY.BOLD,
                    fontSize: FONT_SIZE.XS,
                  }}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/*  for indian national  */}
          {(docOption.value === "indianResident" ||
            docOption.value === "foreignNational") && (
            <View>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: "lightgray",
                  borderRadius: 5,
                  width: "100%",
                  padding: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                onPress={() => setShowDocTypeDropdown(!showDocTypeDropdown)}
              >
                <Text
                  style={{
                    fontFamily: FONT_FAMILY.BOLD,
                    fontSize: FONT_SIZE.XS,
                    color: docType.value ? "black" : "gray",
                  }}
                >
                  {docType.label}
                </Text>
                <Text style={{ color: "gray" }}>▼</Text>
              </TouchableOpacity>
              
              {showDocTypeDropdown && (
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "lightgray",
                    borderRadius: 5,
                    backgroundColor: "white",
                    marginTop: 5,
                  }}
                >
                  {docOption?.documentTypes?.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={{
                        padding: 10,
                        borderBottomWidth: index < docOption.documentTypes.length - 1 ? 1 : 0,
                        borderBottomColor: "lightgray",
                      }}
                      onPress={() => {
                        setDocType(item);
                        setShowDocTypeDropdown(false);
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: FONT_FAMILY.BOLD,
                          fontSize: FONT_SIZE.XS,
                          color: "black",
                        }}
                      >
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          )}
          {/*  for adhaar card  */}
          {docOption.value == "indianResident" &&
            docType.label == "Aadhar Card" && (
              <TextInput
                placeholder="Adhaar number"
                style={{
                  fontFamily: FONT_FAMILY.BOLD,
                  fontSize: FONT_SIZE.XS,
                  // flex: 1,
                  // paddingLeft: 10,
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: "lightgray",
                  borderRadius: 5,
                  width: "100%",
                  padding: 10,
                  // paddingLeft: 10,
                }}
                placeholderTextColor={"gray"}
                keyboardType="number-pad"
              />
            )}
          {/*  for voter card  */}
          {docOption.value == "indianResident" &&
            docType.label == "Election/Voter ID Card" && (
              <TextInput
                placeholder="Voter id number"
                style={{
                  fontFamily: FONT_FAMILY.BOLD,
                  fontSize: FONT_SIZE.XS,
                  // flex: 1,
                  // paddingLeft: 10,
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: "lightgray",
                  borderRadius: 5,
                  width: "100%",
                  padding: 10,
                  // paddingLeft: 10,
                }}
                placeholderTextColor={"gray"}
                keyboardType="number-pad"
              />
            )}
          {/*  for passport number  */}
          {(docOption.value == "indianResident" ||
            docOption.value == "foreignNational") &&
            docType.label == "Passport Number" && (
              <TextInput
                placeholder="Passport number"
                style={{
                  fontFamily: FONT_FAMILY.BOLD,
                  fontSize: FONT_SIZE.XS,
                  // flex: 1,
                  // paddingLeft: 10,
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: "lightgray",
                  borderRadius: 5,
                  width: "100%",
                  padding: 10,
                  // paddingLeft: 10,
                }}
                placeholderTextColor={"gray"}
                keyboardType="number-pad"
              />
            )}
          {/*  for passport expiry  */}
          {(docOption.value == "indianResident" ||
            docOption.value == "foreignNational") &&
            docType.label == "Passport Number" && (
              <TextInput
                placeholder="Passport Expiry Date"
                style={{
                  fontFamily: FONT_FAMILY.BOLD,
                  fontSize: FONT_SIZE.XS,
                  // flex: 1,
                  // paddingLeft: 10,
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: "lightgray",
                  borderRadius: 5,
                  width: "100%",
                  padding: 10,
                  // paddingLeft: 10,
                }}
                placeholderTextColor={"gray"}
                keyboardType="number-pad"
              />
            )}
          {/* checkbox 1 */}
          <TouchableOpacity
            onPress={toggleCheckbox1}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              marginTop: 15,
            }}
          >
            {/* Custom box */}
            <View
              style={{
                width: DEVICE.HEIGHT * 0.018,
                height: DEVICE.HEIGHT * 0.018,
                borderWidth: 1.5,
                borderColor: "gray",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {checked1 && (
                <Text style={{ fontSize: 12, color: 'black' }}>✓</Text>
              )}
            </View>

            {/* Label */}
            <Text
              style={{
                fontFamily: FONT_FAMILY.BOLD,
                fontSize: FONT_SIZE.XS,
                color: "gray",
                flex: 1,
                flexWrap: "wrap",
              }}
            >
              I authorise Aramex India Pvt. Ltd. and its group companies agents
              to act as my/our agent to Custom clear my/our shipments. Read more
            </Text>
          </TouchableOpacity>

          {/* checkbox 2 */}
          <TouchableOpacity
            onPress={toggleCheckbox2}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
            }}
          >
            {/* Custom box */}
            <View
              style={{
                width: DEVICE.HEIGHT * 0.018,
                height: DEVICE.HEIGHT * 0.018,
                borderWidth: 1.5,
                borderColor: "gray",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {checked2 && (
                <Text style={{ fontSize: 12, color: 'black' }}>✓</Text>
              )}
            </View>

            {/* Label */}
            <Text
              style={{
                fontFamily: FONT_FAMILY.BOLD,
                fontSize: FONT_SIZE.XS,
                color: "gray",
                flex: 1,
                flexWrap: "wrap",
              }}
            >
              I have read and consent for processing my information in
              accordance with the Privacy Statement and Cookie Policy
            </Text>
          </TouchableOpacity>

          {/* Upload id part */}
          {/* HEADING */}
          {docOption.value == "indianResident" && (
            <View style={{ paddingTop: 10 }}>
              <Text
                style={{
                  fontFamily: FONT_FAMILY.BOLD,
                  fontSize: FONT_SIZE.LARGE,
                }}
              >
                Front & Back of ID
              </Text>
            </View>
          )}
          {/* sub heading */}
          {docOption.value == "indianResident" && (
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <Text
                style={{
                  fontFamily: FONT_FAMILY.BOLD,
                  fontSize: FONT_SIZE.S,
                  color: "gray",
                }}
              >
                Be sure that your name, photograph, and ID number are clearly
                visible in the ID photograph, or it may be rejected at customs,
                causing delivery delays.
              </Text>
            </View>
          )}
          {/* front side  */}
          {docOption.value == "indianResident" && (
            <View style={{ gap: 2 }}>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: "lightgray",
                  borderRadius: 12,
                  alignSelf: "flex-start",
                  padding: 5,
                }}
              >
                <Text
                  style={{
                    fontFamily: FONT_FAMILY.BOLD,
                    fontSize: FONT_SIZE.S,
                    color: "darkgray",

                    flexWrap: "wrap",
                    paddingLeft: 5,
                  }}
                >
                  Upload front side
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: FONT_FAMILY.BOLD,
                  fontSize: FONT_SIZE.XS,
                  color: "darkgray",
                }}
              >
                Only .jpg and .jpeg files are allowed.
              </Text>
            </View>
          )}
          {/* back side */}
          {docOption.value == "indianResident" && (
            <View style={{ gap: 2 }}>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: "lightgray",
                  borderRadius: 12,
                  alignSelf: "flex-start",
                  padding: 5,
                }}
              >
                <Text
                  style={{
                    fontFamily: FONT_FAMILY.BOLD,
                    fontSize: FONT_SIZE.S,
                    color: "darkgray",

                    flexWrap: "wrap",
                    paddingLeft: 5,
                  }}
                >
                  Upload reverse side
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: FONT_FAMILY.BOLD,
                  fontSize: FONT_SIZE.XS,
                  color: "darkgray",
                }}
              >
                Only .jpg and .jpeg files are allowed.
              </Text>
            </View>
          )}

          {/*  for foreign residents */}
          {docOption.value == "foreignNational" && (
            <View style={{ paddingTop: 10 }}>
              <Text
                style={{
                  fontFamily: FONT_FAMILY.BOLD,
                  fontSize: FONT_SIZE.LARGE,
                }}
              >
                Upload Passport
              </Text>
            </View>
          )}
          {/* sub heading */}
          {docOption.value == "foreignNational" && (
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <Text
                style={{
                  fontFamily: FONT_FAMILY.BOLD,
                  fontSize: FONT_SIZE.S,
                  color: "gray",
                }}
              >
                Be sure that your name, photograph, and ID number are clearly
                visible in the ID photograph, or it may be rejected at customs,
                causing delivery delays.
              </Text>
            </View>
          )}
          {/* front side  */}
          {docOption.value == "foreignNational" && (
            <View style={{ gap: 2 }}>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: "lightgray",
                  borderRadius: 12,
                  alignSelf: "flex-start",
                  padding: 5,
                }}
              >
                <Text
                  style={{
                    fontFamily: FONT_FAMILY.BOLD,
                    fontSize: FONT_SIZE.S,
                    color: "darkgray",

                    flexWrap: "wrap",
                    paddingLeft: 5,
                  }}
                >
                  Upload front side
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: FONT_FAMILY.BOLD,
                  fontSize: FONT_SIZE.XS,
                  color: "darkgray",
                }}
              >
                Only .jpg and .jpeg files are allowed.
              </Text>
            </View>
          )}
          {/* back side */}
          {docOption.value == "foreignNational" && (
            <View style={{ gap: 2 }}>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: "lightgray",
                  borderRadius: 12,
                  alignSelf: "flex-start",
                  padding: 5,
                }}
              >
                <Text
                  style={{
                    fontFamily: FONT_FAMILY.BOLD,
                    fontSize: FONT_SIZE.S,
                    color: "darkgray",

                    flexWrap: "wrap",
                    paddingLeft: 5,
                  }}
                >
                  Upload reverse side
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: FONT_FAMILY.BOLD,
                  fontSize: FONT_SIZE.XS,
                  color: "darkgray",
                }}
              >
                Only .jpg and .jpeg files are allowed.
              </Text>
            </View>
          )}
          {/*  visa / pio  */}
          {docOption.value == "foreignNational" && (
            <View style={{ paddingTop: 10 }}>
              <Text
                style={{
                  fontFamily: FONT_FAMILY.BOLD,
                  fontSize: FONT_SIZE.LARGE,
                }}
              >
                Upload Visa / PIO
              </Text>
            </View>
          )}
          {/*  for passport number  */}
          {docOption.value == "foreignNational" && (
            <TextInput
              placeholder="Document number"
              style={{
                fontFamily: FONT_FAMILY.BOLD,
                fontSize: FONT_SIZE.XS,
                // flex: 1,
                // paddingLeft: 10,
                alignItems: "center",
                borderWidth: 1,
                borderColor: "lightgray",
                borderRadius: 5,
                width: "100%",
                padding: 10,
                // paddingLeft: 10,
              }}
              placeholderTextColor={"gray"}
              keyboardType="number-pad"
            />
          )}
          {/* visa / pio upload side  */}
          {docOption.value == "foreignNational" && (
            <View style={{ gap: 2 }}>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: "lightgray",
                  borderRadius: 12,
                  alignSelf: "flex-start",
                  padding: 5,
                }}
              >
                <Text
                  style={{
                    fontFamily: FONT_FAMILY.BOLD,
                    fontSize: FONT_SIZE.S,
                    color: "darkgray",

                    flexWrap: "wrap",
                    paddingLeft: 5,
                  }}
                >
                  Upload Visa / PIO
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: FONT_FAMILY.BOLD,
                  fontSize: FONT_SIZE.XS,
                  color: "darkgray",
                }}
              >
                Only .jpg and .jpeg files are allowed.
              </Text>
            </View>
          )}
          {/* Choice of ids */}
          <View style={{ gap: 10, paddingVertical: 10 }}>
            {AddressOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setAddressType(option);
                }}
                style={{
                  padding: 10,
                  borderWidth: 1,
                  borderColor:
                    addressType?.value === option.value ? "black" : "lightgray",
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{
                    fontFamily: FONT_FAMILY.BOLD,
                    fontSize: FONT_SIZE.XS,
                  }}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {/*  proof of residence */}
          {docOption.value == "foreignNational" && (
            <View style={{ paddingTop: 10 }}>
              <Text
                style={{
                  fontFamily: FONT_FAMILY.BOLD,
                  fontSize: FONT_SIZE.LARGE,
                }}
              >
                Upload Proof of residence
              </Text>
            </View>
          )}
          {/* sub heading */}
          {docOption.value == "foreignNational" && (
            <View
              style={{ flexDirection: "row", flexWrap: "wrap", paddingTop: 10 }}
            >
              <Text
                style={{
                  fontFamily: FONT_FAMILY.BOLD,
                  fontSize: FONT_SIZE.S,
                  color: "gray",
                  flexWrap: "wrap",
                  flex: 1,
                }}
              >
                Be sure that the address on the document matches the delivery
                address you have submitted above. To see list of acceptable
                documents{" "}
                <Text
                  onPress={() => {
                    // handle link press here
                  }}
                  style={{
                    color: "black",
                    textDecorationLine: "underline",
                  }}
                >
                  click here
                </Text>
                .
              </Text>
            </View>
          )}

          {/*  for foreign national  proof of residence */}
          {docOption.value === "foreignNational" && (
            <View>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: "lightgray",
                  borderRadius: 5,
                  width: "100%",
                  padding: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                onPress={() => setShowProofDropdown(!showProofDropdown)}
              >
                <Text
                  style={{
                    fontFamily: FONT_FAMILY.BOLD,
                    fontSize: FONT_SIZE.XS,
                    color: proofOfResidence.value ? "black" : "gray",
                  }}
                >
                  {proofOfResidence.label}
                </Text>
                <Text style={{ color: "gray" }}>▼</Text>
              </TouchableOpacity>
              
              {showProofDropdown && (
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "lightgray",
                    borderRadius: 5,
                    backgroundColor: "white",
                    marginTop: 5,
                  }}
                >
                  {docOption?.proofOfResidence?.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={{
                        padding: 10,
                        borderBottomWidth: index < docOption.proofOfResidence.length - 1 ? 1 : 0,
                        borderBottomColor: "lightgray",
                      }}
                      onPress={() => {
                        setProofOfResidence(item);
                        setShowProofDropdown(false);
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: FONT_FAMILY.BOLD,
                          fontSize: FONT_SIZE.XS,
                          color: "black",
                        }}
                      >
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          )}

          {/* proof of address upload */}

          {/*  for proof of residence dcoument number  */}
          {docOption.value == "foreignNational" && (
            <TextInput
              placeholder="Document number"
              style={{
                fontFamily: FONT_FAMILY.BOLD,
                fontSize: FONT_SIZE.XS,
                // flex: 1,
                // paddingLeft: 10,
                alignItems: "center",
                borderWidth: 1,
                borderColor: "lightgray",
                borderRadius: 5,
                width: "100%",
                padding: 10,
                // paddingLeft: 10,
              }}
              placeholderTextColor={"gray"}
              keyboardType="number-pad"
            />
          )}
          {/* visa / pio upload side  */}
          {docOption.value == "foreignNational" && (
            <View style={{ gap: 2, paddingBottom: 10 }}>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: "lightgray",
                  borderRadius: 12,
                  alignSelf: "flex-start",
                  padding: 5,
                }}
              >
                <Text
                  style={{
                    fontFamily: FONT_FAMILY.BOLD,
                    fontSize: FONT_SIZE.S,
                    color: "darkgray",

                    flexWrap: "wrap",
                    paddingLeft: 5,
                  }}
                >
                  Upload Proof of residence
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: FONT_FAMILY.BOLD,
                  fontSize: FONT_SIZE.XS,
                  color: "darkgray",
                }}
              >
                Only .jpg and .jpeg files are allowed.
              </Text>
            </View>
          )}

          {/*  alert for proof of residence */}
          {/* sub heading */}
          {docOption.value == "foreignNational" && (
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <Text
                style={{
                  fontFamily: FONT_FAMILY.BOLD,
                  fontSize: FONT_SIZE.S,
                  color: "gray",
                }}
              >
                ID required for customs We will need your ID information before
                shipping your order. Delay in providing ID will impact your
                delivery date.
              </Text>
            </View>
          )}
          {/* checkbox 4 */}
          {docOption.value == "foreignNational" && (
            <TouchableOpacity
              onPress={toggleCheckbox4}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              <View
                style={{
                  width: DEVICE.HEIGHT * 0.018,
                  height: DEVICE.HEIGHT * 0.018,
                  borderWidth: 1.5,
                  borderColor: "gray",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {checked4 && (
                  <Text style={{ fontSize: 12, color: 'black' }}>✓</Text>
                )}
              </View>

              <Text
                style={{
                  fontFamily: FONT_FAMILY.BOLD,
                  fontSize: FONT_SIZE.XS,
                  color: "gray",
                  flex: 1,
                  flexWrap: "wrap",
                }}
              >
                I have read and consent for processing my information in
                accordance with the Privacy Statement and Cookie Policy.
              </Text>
            </TouchableOpacity>
          )}

          {/*  Address proof info  */}
          {/* proof of residence */}
          {docOption.value == "foreignNational" && (
            <View style={{ paddingTop: 10 }}>
              <Text
                style={{
                  fontFamily: FONT_FAMILY.BOLD,
                  fontSize: FONT_SIZE.LARGE,
                }}
              >
                Address Proof
              </Text>
            </View>
          )}

          {docOption.value == "foreignNational" && (
            <View style={{ gap: 5 }}>
              <Text
                style={{
                  fontFamily: FONT_FAMILY.BOLD,
                  fontSize: FONT_SIZE.S,
                  color: "gray",
                }}
              >
                Please provide any ONE of the following address proof document.
                The address on this document should match with the delivery
                address.
              </Text>

              {/* Mapped document list */}
              {FOREIGN_PROOF_DOCUMENTS.map((item, index) => (
                <Text
                  key={index}
                  style={{
                    fontFamily: FONT_FAMILY.MEDIUM,
                    fontSize: FONT_SIZE.XS,
                    color: "gray",
                    marginLeft: 0,
                  }}
                >
                  {`${String.fromCharCode(97 + index)}. ${item}`}
                </Text>
              ))}
            </View>
          )}

          {/* checkbox 3*/}
          <TouchableOpacity
            onPress={toggleCheckbox3}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
            }}
          >
            {/* Custom box */}
            <View
              style={{
                width: DEVICE.HEIGHT * 0.021,
                height: DEVICE.HEIGHT * 0.021,
                borderWidth: 1.5,
                borderColor: "gray",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {checked3 && (
                <Text style={{ fontSize: 12, color: 'black' }}>✓</Text>
              )}
            </View>

            {/* Label */}
            <Text
              style={{
                fontFamily: FONT_FAMILY.BOLD,
                fontSize: FONT_SIZE.S,
                color: "black",
                flex: 1,
                flexWrap: "wrap",
                paddingLeft: 5,
              }}
            >
              Billing matches shipping address
            </Text>
          </TouchableOpacity>

          {/* Place Order Button */}
          <TouchableOpacity
            style={{
              backgroundColor: "black",
              borderRadius: 12,
              paddingVertical: 16,
              marginTop: 20,
              marginHorizontal: 0,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => navigation.navigate('OrderConfirmationPhone')}
          >
            <Text
              style={{
                fontFamily: FONT_FAMILY.BOLD,
                fontSize: FONT_SIZE.S,
                color: "white",
                textAlign: "center",
              }}
            >
              Place Order
            </Text>
          </TouchableOpacity>
          
          <View style={{ height: 70 }}></View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CustomClearance;
