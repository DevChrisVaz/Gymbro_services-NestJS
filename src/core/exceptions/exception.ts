export type TException = {
  /**
   * A links object that MAY contain the following members.
   * @type {Object}
   */
  links?: {
    /**
     * A link that leads to further details about this particular occurrence of the problem.
     * When dereferenced, this URI SHOULD return a human-readable description of the error.
     * @type {string}
     */
    about?: string;

    /**
     * A link that identifies the type of error that this particular error is an instance of.
     * This URI SHOULD be dereferenceable to a human-readable explanation of the general error.
     * @type {string}
     */
    type?: string;
  };

  /**
   * The HTTP status code applicable to this problem, expressed as a string value.
   * This SHOULD be provided.
   * @type {string}
   */
  status: string;

  /**
   * An application-specific error code, expressed as a string value.
   * @type {string}
   */
  code: string;

  /**
   * A short, human-readable summary of the problem that SHOULD NOT change from occurrence to occurrence of the problem, except for purposes of localization.
   * @type {string}
   */
  title: string;

  /**
   * A human-readable explanation specific to this occurrence of the problem.
   * Like title, this field’s value can be localized.
   * @type {string}
   */
  detail: string;

  /**
   * An object containing references to the primary source of the error.
   * It SHOULD include one of the following members or be omitted:
   * @type {Object}
   */
  source?: {
    /**
     * A JSON Pointer [RFC6901] to the value in the request document that caused the error.
     * This MUST point to a value in the request document that exists.
     * @type {string}
     */
    pointer?: string;

    /**
     * A string indicating which URI query parameter caused the error.
     * @type {string}
     */
    parameter?: string;

    /**
     * A string indicating the name of a single request header which caused the error.
     * @type {string}
     */
    header?: string;
  };

  /**
   * A meta object containing non-standard meta-information about the error.
   * @type {Object}
   */
  meta?: object;

  /**
   * A boolean indicating if the error details should be returned to the client.
   * @type {boolean}
   */
  hideDetails?: boolean;
};

export abstract class Exception extends Error implements TException {
  links?:
    | {
        /**
         * A link that leads to further details about this particular occurrence of the problem.
         * When dereferenced, this URI SHOULD return a human-readable description of the error.
         * @type {string}
         */
        about?: string;
        /**
         * A link that identifies the type of error that this particular error is an instance of.
         * This URI SHOULD be dereferenceable to a human-readable explanation of the general error.
         * @type {string}
         */
        type?: string;
      }
    | undefined;
  status: string;
  code: string;
  title: string;
  detail: string;
  source?:
    | {
        /**
         * A JSON Pointer [RFC6901] to the value in the request document that caused the error.
         * This MUST point to a value in the request document that exists.
         * @type {string}
         */
        pointer?: string;
        /**
         * A string indicating which URI query parameter caused the error.
         * @type {string}
         */
        parameter?: string;
        /**
         * A string indicating the name of a single request header which caused the error.
         * @type {string}
         */
        header?: string;
      }
    | undefined;
  meta?: object | undefined;

  hideDetails?: boolean;

  constructor(exception: TException) {
    super(exception.title);
    Object.assign(this, exception);
  }
}
