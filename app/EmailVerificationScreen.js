import { useRef, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View,
} from "react-native";

export default function EmailVerificationScreen({ navigation }) {
  const isDark = useColorScheme() === "dark";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={[
        styles.container,
        { backgroundColor: isDark ? "#111827" : "#ffffff" },
      ]}
    >
      <View style={styles.inner}>
        <Text style={[styles.title, { color: "#3b82f6" }]}>
          Email Verification
        </Text>

        <Text
          style={[
            styles.subtitle,
            { color: isDark ? "#9ca3af" : "#6b7280" },
          ]}
        >
          We've sent a verification code to your email.{"\n"}
          Please enter it below to verify your account.
        </Text>

        <Text
          style={[
            styles.description,
            { color: isDark ? "#fff" : "#111" },
          ]}
        >
          Enter the 6-digit code sent to your email address to verify your
          account
        </Text>

        {/* OTP INPUTS */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputsRef.current[index] = ref)}
              style={[
                styles.otpInput,
                {
                  backgroundColor: isDark ? "#1f2937" : "#ffffff",
                  color: isDark ? "#fff" : "#000",
                  borderColor: isDark ? "#4b5563" : "#d1d5db",
                },
              ]}
              maxLength={1}
              keyboardType="numeric"
              value={digit}
              onChangeText={(v) => handleChange(v, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
            />
          ))}
        </View>

        {/* CONFIRM BUTTON */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  inner: {
    padding: 22,
    alignItems: "center",
  },

  title: {
    fontSize: 36,
    fontWeight: "700",
    marginBottom: 10,
  },

  subtitle: {
    textAlign: "center",
    fontSize: 15,
    marginBottom: 20,
  },

  description: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 30,
  },

  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginBottom: 40,
    marginRight: 10,
    marginLeft: 10,
    paddingLeft: 50,
  },

  otpInput: {
    width: 55,
    height: 65,
    fontSize: 26,
    textAlign: "center",
    borderWidth: 2,
    borderRadius: 12,
  },

  button: {
    width: "100%",
    backgroundColor: "#3b82f6",
    paddingVertical: 15,
    borderRadius: 30,
  },

  buttonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "700",
  },
});
