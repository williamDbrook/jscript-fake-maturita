import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

const supabase = createClient("https://criywvntaywwaqpmopij.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNyaXl3dm50YXl3d2FxcG1vcGlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4NDE5MzYsImV4cCI6MjA2MTQxNzkzNn0.PaG3XKxFd2TGZ8wTOo19iddC8vYV9UhiJrLlpSOe3sU");

function SignUpSignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authMessage, setAuthMessage] = useState("");

  // Function to handle user sign-up
  async function handleSignUp(e) {
    e.preventDefault();
    try {
      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user data into the 'users' table in Supabase
      const { data, error } = await supabase.from("users").insert([
        { username: username, password: hashedPassword },
      ]);

      if (error) throw error;
      setAuthMessage("Sign-up successful! You can now sign in.");
    } catch (error) {
      setAuthMessage(`Error: ${error.message}`);
    }
  }

  // Function to handle user sign-in
  async function handleSignIn(e) {
    e.preventDefault();
    try {
      // Fetch the user data from the 'users' table
      const { data, error } = await supabase
        .from("users")
        .select("username, password")
        .eq("username", username);

      if (error) throw error;

      if (data.length === 0) {
        setAuthMessage("User not found.");
        return;
      }

      // Compare the entered password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, data[0].password);
      if (isPasswordValid) {
        setAuthMessage("Sign-in successful!");
      } else {
        setAuthMessage("Invalid password.");
      }
    } catch (error) {
      setAuthMessage(`Error: ${error.message}`);
    }
  }

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>

      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
      </form>

      {authMessage && <p>{authMessage}</p>}
    </div>
  );
}

export default SignUpSignIn;