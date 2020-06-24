<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        if ($request->is('api', 'api/*')) {
            if ($exception instanceof \Illuminate\Auth\AuthenticationException) {
                return response(['error' => 'Unauthenticated'], 401);
            }

            if ($exception instanceof \Illuminate\Database\Eloquent\ModelNotFoundException) {
                return response(['error' => 'Not Found'], 404);
            }

            if ($exception instanceof \Illuminate\Validation\ValidationException) {
                return response([
                    'error' => 'Validation',
                    'validation_fields' => $exception->validator->errors(),
                ], 422);
            }

            if (method_exists($exception, 'getStatusCode')) {
                if ($exception->getStatusCode() === 401) {
                    return response(['error' => 'Unauthenticated'], 401);
                }
                
                if ($exception->getStatusCode() === 403) {
                    return response(['error' => 'Forbidden'], 403);
                }
                
                if ($exception->getStatusCode() === 404) {
                    return response(['error' => 'Not Found'], 404);
                }
            }

            return response([
                'error' => 'Internal Error',
                'class' => get_class($exception),
                'message' => $exception->getMessage(),
                'code' => $exception->getCode(),
                'file' => $exception->getFile(),
                'line' => $exception->getLine(),
                'trace' => $exception->getTrace(),
            ]);

            return parent::render($request, $exception);
        }

        return parent::render($request, $exception);
    }
}
