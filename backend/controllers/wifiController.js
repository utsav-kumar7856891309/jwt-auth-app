import wifi from "node-wifi";
wifi.init({ iface: null });
export const scanWifi = async (req, res) => {
  try {
    const networks = await new Promise((resolve, reject) => {
      wifi.scan((err, networks) => {
        if (err) return reject(err);
        resolve(networks);
      });
    });
    return res.json({ networks });
  } catch (error) {
    console.error("WiFi scan error:", error);
    return res.status(500).json({ msg: "WiFi scan failed", error: error.message });
  }
};
