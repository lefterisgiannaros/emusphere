import { downloadDats } from './download-dats';
import { downloadRetroarch } from './download-retroarch';
import { downloadCores } from './download-cores';

async function setup() {
  console.log('=== RetroHub Setup ===\n');
  await downloadRetroarch();
  await downloadCores();
  await downloadDats();
  console.log('\n=== Setup Complete ===');
}

setup().catch(console.error);