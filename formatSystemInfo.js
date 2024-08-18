const si = require("systeminformation");
const fs = require("fs");
const path = require("path");

// Function to format bytes into a human-readable format
const formatBytes = (bytes) => {
  if (bytes === 0) return "0 Byte";
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
};

// Function to get a unique filename
const getUniqueFilename = (baseName) => {
  const date = new Date().toISOString().replace(/[:.]/g, "-");
  return `${baseName}_${date}.md`;
};

// Function to format and print system information
const printSystemInfo = async () => {
  try {
    const cpu = await si.cpu();
    const mem = await si.mem();
    const disk = await si.diskLayout();
    const network = await si.networkInterfaces();

    const baseFilename = path.join(__dirname, "System_Info");
    const filename = getUniqueFilename(baseFilename);

    const output = [];

    // console.log("### System Performance and Usage ###\n");

    // console.log("**CPU:**");
    // console.log(`  - **Brand/Model:** ${cpu.brand} ${cpu.brand_raw}`);
    // console.log(`  - **Speed:** ${cpu.speed} GHz`);
    // console.log(`  - **Cores:** ${cpu.cores} physical cores`);
    // console.log(`  - **Cache:**`);
    // console.log(`    - L1 Data Cache: ${cpu.cache.l1d} KB`);
    // console.log(`    - L1 Instruction Cache: ${cpu.cache.l1i} KB`);
    // console.log(`    - L2 Cache: ${formatBytes(cpu.cache.l2)}`);
    // console.log(`    - L3 Cache: ${formatBytes(cpu.cache.l3)}\n`);

    // console.log("**Memory (RAM):**");
    // console.log(`  - **Total:** ${formatBytes(mem.total)}`);
    // console.log(`  - **Used:** ${formatBytes(mem.active)}`);
    // console.log(`  - **Free:** ${formatBytes(mem.free)}`);
    // console.log(`  - **Swap Space Total:** ${formatBytes(mem.swaptotal)}`);
    // console.log(`  - **Swap Used:** ${formatBytes(mem.swapused)}`);
    // console.log(`  - **Swap Free:** ${formatBytes(mem.swapfree)}\n`);

    output.push("### System Performance and Usage ###\n");

    output.push("**CPU:**");
    output.push(`  - **Brand/Model:** ${cpu.brand} ${cpu.brand_raw}`);
    output.push(`  - **Speed:** ${cpu.speed} GHz`);
    output.push(`  - **Cores:** ${cpu.cores} physical cores`);
    output.push(`  - **Cache:**`);
    output.push(`    - L1 Data Cache: ${cpu.cache.l1d} KB`);
    output.push(`    - L1 Instruction Cache: ${cpu.cache.l1i} KB`);
    output.push(`    - L2 Cache: ${formatBytes(cpu.cache.l2)}`);
    output.push(`    - L3 Cache: ${formatBytes(cpu.cache.l3)}\n`);

    output.push("**Memory (RAM):**");
    output.push(`  - **Total:** ${formatBytes(mem.total)}`);
    output.push(`  - **Used:** ${formatBytes(mem.active)}`);
    output.push(`  - **Free:** ${formatBytes(mem.free)}`);
    output.push(`  - **Swap Space Total:** ${formatBytes(mem.swaptotal)}`);
    output.push(`  - **Swap Used:** ${formatBytes(mem.swapused)}`);
    output.push(`  - **Swap Free:** ${formatBytes(mem.swapfree)}\n`);

    // console.log("**Disk:**");

    output.push("**Disk:**");
    disk.forEach((disk) => {
    //   console.log(`  - **Name:** ${disk.name}`);
    //   console.log(`    - **Size:** ${formatBytes(disk.size)}`);
    //   console.log(`    - **Type:** ${disk.type}`);
    //   console.log(`    - **Interface:** ${disk.interfaceType}`);

      output.push(`  - **Name:** ${disk.name}`);
      output.push(`    - **Size:** ${formatBytes(disk.size)}`);
      output.push(`    - **Type:** ${disk.type}`);
      output.push(`    - **Interface:** ${disk.interfaceType}`);
    });
    output.push();
    // console.log();

    // console.log("**Network Interfaces:**");

    output.push("**Network Interfaces:**");
    network.forEach((net) => {
    //   console.log(`  - **Interface:** ${net.iface}`);
    //   console.log(`    - **Name:** ${net.ifaceName}`);
    //   console.log(`    - **IP Address:** ${net.ip4 || "N/A"}`);
    //   console.log(`    - **MAC Address:** ${net.mac}`);
    //   console.log(`    - **Status:** ${net.operstate}`);
    //   console.log();

      output.push(`  - **Interface:** ${net.iface}`);
      output.push(`    - **Name:** ${net.ifaceName}`);
      output.push(`    - **IP Address:** ${net.ip4 || "N/A"}`);
      output.push(`    - **MAC Address:** ${net.mac}`);
      output.push(`    - **Status:** ${net.operstate}`);
      output.push();
    });

    // Write the data to the new file
    fs.writeFileSync(filename, output.join("\n"), "utf-8");
    console.log(`System information saved to ${filename}`);
  } catch (error) {
    console.error("Error fetching system information:", error);
  }
};

// Run the function to print system information
printSystemInfo();
