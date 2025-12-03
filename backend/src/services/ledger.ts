import { Ledger, CreateEvent } from '@daml/ledger';
import * as jwt from 'jsonwebtoken';
import * as daml from '../daml';

// Configuration based on Canton setup and JWT requirements
const LEDGER_ID = 'cpcv_domain'; // In Canton, the domain ID often serves as the Ledger ID.
const APPLICATION_ID = 'cpcv-backend';
const JWT_SECRET = 'dummysecret'; // For unsecured development ledgers, the secret is not validated.

/**
 * Generates a JWT for a given party to interact with the JSON Ledger API.
 */
const generateToken = (party: string) => {
  const payload = {
    "https://daml.com/ledger-api": {
      ledgerId: LEDGER_ID,
      applicationId: APPLICATION_ID,
      actAs: [party],
    },
  };
  return jwt.sign(payload, JWT_SECRET);
};

interface LedgerConfig {
  host: string;
  port: number;
  party: string;
}

/**
 * A service to interact with a Daml ledger.
 * It encapsulates the @daml/ledger functionality and provides methods
 * for querying, creating, and exercising choices on contracts.
 */
class LedgerService {
  private ledger: Ledger;
  public readonly party: string;

  constructor(config: LedgerConfig) {
    this.party = config.party;
    const token = generateToken(config.party);
    // Note: The @daml/ledger library was replaced with a direct http-based implementation,
    // so we construct the URL manually.
    const httpBaseUrl = `http://${config.host}:${config.port}/`;
    this.ledger = new Ledger({ token, httpBaseUrl });
  }

  /**
   * Query for active contracts of a specific template.
   * @param template The Daml template to query for.
   * @returns A promise that resolves to an array of active contracts.
   */
  async query<T extends daml.Template<any, any, any>>(template: T): Promise<CreateEvent<T>[]> {
    return this.ledger.query(template);
  }

  /**
    * Fetch a specific contract by its ID.
    * @param template The Daml template to fetch.
    * @param contractId The ID of the contract to fetch.
    * @returns A promise that resolves to the contract, or null if not found.
    */
  async fetch<T extends daml.Template<any, any, any>>(template: T, contractId: string): Promise<CreateEvent<T> | null> {
    return this.ledger.fetch(template, contractId);
  }

  /**
   * Create a new contract.
   * @param template The Daml template to create.
   * @param payload The data for the new contract.
   * @returns A promise that resolves to the created contract.
   */
  async create<T extends daml.Template<any, any, any>>(template: T, payload: daml.TemplateFields<T>): Promise<CreateEvent<T>> {
    return this.ledger.create(template, payload);
  }

  /**
   * Exercise a choice on a contract.
   * @param choice The choice to exercise.
   * @param contractId The ID of the contract to exercise the choice on.
   * @param argument The argument for the choice.
   * @returns A promise that resolves to the result of the choice.
   */
  async exercise<T extends daml.Template<any, any, any>, C extends daml.Choice<T, any, any>>(
    choice: C,
    contractId: string,
    argument: daml.ChoiceArgument<C>
  ): Promise<daml.ChoiceResult<C>> {
    return this.ledger.exercise(choice, contractId, argument);
  }
}

// Export configured instances for each institution
export const institutionALedger = new LedgerService({
  host: 'localhost',
  port: 5011,
  party: 'InstitutionA'
});

export const institutionBLedger = new LedgerService({
  host: 'localhost',
  port: 5021,
  party: 'InstitutionB'
});

export default LedgerService;