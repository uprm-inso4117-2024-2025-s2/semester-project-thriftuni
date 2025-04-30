import {
  getListings,
  getCurrentUserListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing,
  getListingImages,
  getSellerById
} from './Api.ts'

const fuzzInputs = [
  null, undefined, "", " ", 0, 12345, true, false, NaN, Infinity, -Infinity,
  () => "bad", Symbol("bad"), new Date(), BigInt(999999999999999999999999n),
  [], {}, { a: 1 }, [1, 2, 3], new Map([["key", "value"]]), new Set([1, 2, 3]),
  Object.create(null),
  "<script>alert(1)</script>", "' OR '1'='1", '" onmouseover="alert(1)"',
  "../../../../../etc/passwd", "<?php echo 'hack'; ?>", "%00", "%3Cscript%3E", "%2F..%2F",
  "🔥".repeat(10), "💣".repeat(500), "a".repeat(1000), "\u0000\u0001\u0002",
  "null", "undefined", "[object Object]", "123abc", "2025-02-30", "00:99", "DROP TABLE users;",
  { title: "<script>", user: null },
  { title: "🔥🔥🔥", description: "💣".repeat(100) },
  { toString: () => "injected" },
  { unexpectedField: "x" }
];

(async () => {
  console.log("Starting Firebase Function Fuzzing...\n");

  try {
    console.log(" getListings()");
    const res = await getListings();
    console.log("Success:", res.length, "items");
  } catch (err) {
    console.error("getListings failed:", err.message);
  }

  try {
    console.log("\n getCurrentUserListings()");
    const res = await getCurrentUserListings();
    console.log("Success:", res.length, "items");
  } catch (err) {
    console.error("getCurrentUserListings failed:", err.message);
  }

  for (let input of fuzzInputs) {
    try {
      console.log(`\n getListingById(${String(input)})`);
      const res = await getListingById(input);
      console.log("Success:", res);
    } catch (err) {
      console.error("Crashed:", err.message);
    }
  }

  for (let input of fuzzInputs) {
    try {
      console.log(`\n createListing(${JSON.stringify(input)})`);
      const res = await createListing(input);
      console.log("Created:", res);
    } catch (err) {
      console.error("Crashed:", err.message);
    }
  }

  for (let input of fuzzInputs) {
    try {
      console.log(`\n updateListing(${String(input)}, ${JSON.stringify(input)})`);
      const res = await updateListing(input, input);
      console.log("Updated:", res);
    } catch (err) {
      console.error("Crashed:", err.message);
    }
  }

  for (let input of fuzzInputs) {
    try {
      console.log(`\n deleteListing(${String(input)})`);
      const res = await deleteListing(input);
      console.log("Deleted:", res);
    } catch (err) {
      console.error("Crashed:", err.message);
    }
  }

  for (let input of fuzzInputs) {
    try {
      console.log(`\n getListingImages(${String(input)})`);
      const res = await getListingImages(input);
      console.log("Images:", res.length);
    } catch (err) {
      console.error("Crashed:", err.message);
    }
  }

  for (let input of fuzzInputs) {
    try {
      console.log(`\n getSellerById(${String(input)})`);
      const res = await getSellerById(input);
      console.log("Success:", res);
    } catch (err) {
      console.error("Crashed:", err.message);
    }
  }

})();

